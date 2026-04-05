let logs = [];

function loadLogs() {
    const file = document.getElementById("fileInput").files[0];
    const reader = new FileReader();

    reader.onload = function(e) {
        const lines = e.target.result.split("\n");
        logs = lines.map(line => {
            let parts = line.split(" ");
            return {
                time: parts[0],
                ip: parts[1],
                status: parts[2],
                msg: parts.slice(3).join(" ")
            };
        });

        displayLogs(logs);
        updateStats();
    };

    reader.readAsText(file);
}

function displayLogs(data) {
    const table = document.getElementById("logTable");
    table.innerHTML = "";

    data.forEach(log => {
        let row = `<tr class="${log.status === 'FAILED' ? 'suspicious' : ''}">
            <td>${log.time}</td>
            <td>${log.ip}</td>
            <td>${log.status}</td>
            <td>${log.msg}</td>
        </tr>`;
        table.innerHTML += row;
    });
}

function updateStats() {
    document.getElementById("totalLogs").innerText = logs.length;

    let failed = logs.filter(l => l.status === "FAILED").length;
    document.getElementById("failed").innerText = failed;

    document.getElementById("alerts").innerText = failed > 5 ? 1 : 0;
}

function filterLogs() {
    let ip = document.getElementById("searchIP").value;
    let filtered = logs.filter(l => l.ip.includes(ip));
    displayLogs(filtered);
}