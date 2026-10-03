<?php
declare(strict_types=1);

const PUBLISH_TOKEN = 'CHANGE_ME_ON_SERVER';
const RELEASE_DIR = __DIR__ . '/releases';

header('Content-Type: application/json; charset=utf-8');

function fail(string $message, int $status = 400): never {
    http_response_code($status);
    echo json_encode(['ok' => false, 'error' => $message], JSON_UNESCAPED_SLASHES);
    exit;
}

if ($_SERVER['REQUEST_METHOD'] !== 'POST') fail('POST required', 405);
$token = (string)($_POST['token'] ?? '');
if (!hash_equals(PUBLISH_TOKEN, $token)) fail('unauthorized', 401);

$version = (string)($_POST['version'] ?? '');
if (!preg_match('/^v?\d+\.\d+\.\d+(?:[-.][A-Za-z0-9.-]+)?$/', $version)) fail('invalid version');
$version = ltrim($version, 'v');

if (!isset($_FILES['file']) || $_FILES['file']['error'] !== UPLOAD_ERR_OK) fail('zip upload missing');

$zip = new ZipArchive();
if ($zip->open($_FILES['file']['tmp_name']) !== true) fail('invalid zip');

$releasePath = RELEASE_DIR . '/v' . $version;
if (is_dir($releasePath)) fail('release already exists', 409);
if (!mkdir($releasePath, 0755, true) && !is_dir($releasePath)) fail('cannot create release directory', 500);

for ($i = 0; $i < $zip->numFiles; $i++) {
    $name = $zip->getNameIndex($i);
    if ($name === false || str_contains($name, '..') || str_starts_with($name, '/')) {
        $zip->close();
        fail('unsafe zip path');
    }
}

$zip->extractTo($releasePath);
$zip->close();

if (!is_file($releasePath . '/index.html')) fail('release has no index.html');

$iterator = new RecursiveIteratorIterator(new RecursiveDirectoryIterator($releasePath, FilesystemIterator::SKIP_DOTS));
foreach ($iterator as $file) {
    $relative = substr($file->getPathname(), strlen($releasePath) + 1);
    $target = __DIR__ . '/' . $relative;
    if ($relative === 'publish.php') continue;
    if (!is_dir(dirname($target))) mkdir(dirname($target), 0755, true);
    copy($file->getPathname(), $target);
}

file_put_contents(__DIR__ . '/version.json', json_encode([
    'version' => $version,
    'published' => date(DATE_ATOM)
], JSON_PRETTY_PRINT | JSON_UNESCAPED_SLASHES));

echo json_encode(['ok' => true, 'version' => $version, 'release' => 'releases/v' . $version . '/'], JSON_UNESCAPED_SLASHES);
