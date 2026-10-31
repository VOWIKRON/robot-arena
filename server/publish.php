<?php
declare(strict_types=1);

// Configure ROBOT_ARENA_PUBLISH_TOKEN in the server environment.
const PUBLISH_TOKEN_ENV = 'ROBOT_ARENA_PUBLISH_TOKEN';
const RELEASE_DIR = __DIR__ . '/releases';

header('Content-Type: application/json; charset=utf-8');

function fail(string $message, int $status = 400): never {
    http_response_code($status);
    echo json_encode(['ok' => false, 'error' => $message], JSON_UNESCAPED_SLASHES);
    exit;
}

if ($_SERVER['REQUEST_METHOD'] !== 'POST') fail('POST required', 405);
$token = (string)($_POST['token'] ?? '');
$expectedToken = getenv(PUBLISH_TOKEN_ENV);
if (!is_string($expectedToken) || $expectedToken === '' || !hash_equals($expectedToken, $token)) fail('unauthorized', 401);
$mode = (string)($_POST['mode'] ?? 'release');
if (!in_array($mode, ['release', 'current-only'], true)) fail('invalid mode');

$version = (string)($_POST['version'] ?? '');
if (!preg_match('/^v?\d+\.\d+\.\d+(?:[-.][A-Za-z0-9.-]+)?$/', $version)) fail('invalid version');
$version = ltrim($version, 'v');

if (!isset($_FILES['file']) || $_FILES['file']['error'] !== UPLOAD_ERR_OK) fail('zip upload missing');

$zip = new ZipArchive();
if ($zip->open($_FILES['file']['tmp_name']) !== true) fail('invalid zip');

$releasePath = RELEASE_DIR . '/v' . $version;
if ($mode === 'release' && is_dir($releasePath)) fail('release already exists', 409);
$stagingPath = __DIR__ . '/.publish-staging-' . bin2hex(random_bytes(12));
if (!mkdir($stagingPath, 0700)) fail('cannot create staging directory', 500);

for ($i = 0; $i < $zip->numFiles; $i++) {
    $name = $zip->getNameIndex($i);
    if ($name === false || str_contains($name, '..') || str_starts_with($name, '/')) {
        $zip->close();
        fail('unsafe zip path');
    }
}

$zip->extractTo($stagingPath);
$zip->close();

if (!is_file($stagingPath . '/index.html')) fail('release has no index.html');
if ($mode === 'current-only' && !is_dir($releasePath)) fail('existing release required for current-only mode', 409);
if ($mode === 'release') {
    if (!rename($stagingPath, $releasePath)) fail('cannot commit release directory', 500);
} else {
    $releaseVersion = json_decode((string)@file_get_contents(__DIR__ . '/version.json'), true);
    if (!is_array($releaseVersion) || ($releaseVersion['version'] ?? '') !== $version) fail('current-only requires matching live version', 409);
}
$sourcePath = $mode === 'release' ? $releasePath : $stagingPath;

$iterator = new RecursiveIteratorIterator(new RecursiveDirectoryIterator($sourcePath, FilesystemIterator::SKIP_DOTS));
foreach ($iterator as $file) {
    $relative = substr($file->getPathname(), strlen($sourcePath) + 1);
    $target = __DIR__ . '/' . $relative;
    if ($relative === 'publish.php') continue;
    if (!is_dir(dirname($target))) mkdir(dirname($target), 0755, true);
    if (!copy($file->getPathname(), $target)) fail('cannot copy live file', 500);
}

if ($mode === 'current-only') {
    $cleanup = new RecursiveIteratorIterator(new RecursiveDirectoryIterator($stagingPath, FilesystemIterator::SKIP_DOTS), RecursiveIteratorIterator::CHILD_FIRST);
    foreach ($cleanup as $entry) { $entry->isDir() ? rmdir($entry->getPathname()) : unlink($entry->getPathname()); }
    rmdir($stagingPath);
}
file_put_contents(__DIR__ . '/version.json', json_encode([
    'version' => $version,
    'published' => date(DATE_ATOM)
], JSON_PRETTY_PRINT | JSON_UNESCAPED_SLASHES));

echo json_encode(['ok' => true, 'version' => $version, 'release' => 'releases/v' . $version . '/', 'mode' => $mode], JSON_UNESCAPED_SLASHES);
