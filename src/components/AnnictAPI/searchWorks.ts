export async function fetchWorksData() {
    // 実際のAPIリクエストコードをここに書く
    // 例: fetch('API_URL').then(response => response.json());
  
    // サンプルデータ
    return {
      searchWorks: {
        edges: [
          { node: { title: "葬送のフリーレン" } },
          { node: { title: "薬屋のひとりごと" } },
          { node: { title: "SPY×FAMILY Season 2" } }
        ]
      }
    };
  }