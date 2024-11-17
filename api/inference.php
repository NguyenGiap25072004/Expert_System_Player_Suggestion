<?php
header("Content-Type: application/json");

$data = json_decode(file_get_contents("php://input"), true);
$csvFile = fopen("database.csv", "r");
$players = [];
$headers = fgetcsv($csvFile);

while ($row = fgetcsv($csvFile)) {
    $player = array_combine($headers, $row);
    $match = true;

    foreach ($data as $key => $value) {
        if ($player[$key] !== $value) {
            $match = false;
            break;
        }
    }

    if ($match) {
        $players[] = $player;
    }
}

fclose($csvFile);
echo json_encode($players);
