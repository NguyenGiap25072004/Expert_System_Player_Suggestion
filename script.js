document
  .getElementById("criteriaForm")
  .addEventListener("submit", async function (event) {
    event.preventDefault();

    const formData = new FormData(this);
    const criteria = {};
    formData.forEach((value, key) => {
      criteria[key] = value;
    });

    try {
      const response = await fetch("api/inference.php", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(criteria),
      });

      const players = await response.json();
      const resultsTable = document.querySelector("#results tbody");
      resultsTable.innerHTML = "";

      players.forEach((player) => {
        const row = document.createElement("tr");
        row.innerHTML = `
                <td>${player.name}</td>
                <td>${player.position}</td>
                <td>${player.age}</td>
                <td>${player.value}</td>
                <td>${player.country}</td>
                <td>${player.contracttime}</td>
                <td>
                  <button class="details-btn" onclick="viewPlayerDetails('${player.name}')">Xem chi tiết</button>
                </td>
            `;
        resultsTable.appendChild(row);
      });
    } catch (error) {
      console.error("Error fetching players:", error);
    }
  });

  function viewPlayerDetails(playerName) {
    // Chuyển hướng tới trang chi tiết
    window.location.href = `player_details.html?name=${encodeURIComponent(playerName)}`;
}
