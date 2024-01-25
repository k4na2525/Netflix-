function loadFileFromGitHub(fileUrl) {
    fetch(fileUrl)
      .then(response => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.text();
      })
      .then(text => {
        const lines = text.split('\n');
        const container = document.getElementById('netflixList');
        container.innerHTML = ''; // 以前の内容をクリア
  
        for (let i = 0; i < lines.length; i += 2) {
          if (!lines[i] || !lines[i + 1] || lines[i].trim() === '' || lines[i + 1].trim() === '') {
            continue;
          }
          const title = lines[i];
          const url = "https://www.netflix.com/title/" + lines[i + 1];
  
          const element = document.createElement('div');
          const linkElement = document.createElement('a');
  
          linkElement.href = url;
          linkElement.textContent = title; // リンクテキストにタイトルを使用
          linkElement.target = '_blank';
  
          element.appendChild(linkElement);
          container.appendChild(element);
        }
      })
      .catch(error => {
        alert('Error fetching file:', error);
      });
  }
  
document.addEventListener('DOMContentLoaded', function() {
    // GitHub API からファイル一覧を取得するコード...
    const repoOwner = 'k4na2525';
    const repoName = 'NetflixList';
    const apiUrl = `https://api.github.com/repos/${repoOwner}/${repoName}/contents/`;

    fetch(apiUrl)
    .then(response => response.json())
    .then(data => {
        const fileList = document.getElementById('fileList');
        data.forEach(file => {
            const option = document.createElement('option');
            option.value = file.download_url;
            option.textContent = file.name;
            fileList.appendChild(option);
        });

        // 最初のファイルを選択し、内容を表示
        if (data.length > 0) {
            fileList.selectedIndex = 0;
            loadFileFromGitHub(data[0].download_url);
        }
  });
  // ファイル選択時のイベントハンドラー
  fileList.addEventListener('change', function() {
      loadFileFromGitHub(fileList.value);
  });
});
