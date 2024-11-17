<?php
header("Content-Type: application/json");

if (isset($_GET['name'])) {
    $playerName = $_GET['name'];
    $csvFile = fopen("database.csv", "r");
    $headers = fgetcsv($csvFile);

    while ($row = fgetcsv($csvFile)) {
        $player = array_combine($headers, $row);
        if ($player['name'] === $playerName) {
            fclose($csvFile);
            echo json_encode($player);
            exit;
        }
    }

    fclose($csvFile);
    echo json_encode(null);
}
?>
