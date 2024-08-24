export function parseDate(input: string): string {
  // 現在の年を取得
  const today = new Date();
  let year = today.getFullYear();
  let season: string = '';

  // 年の計算
  const yearMatch = input.match(/(\d+)年前/);
  if (yearMatch) {
      year -= parseInt(yearMatch[1], 10);
  }

  // 季節の変換
  if (input.includes('春')) {
      season = 'spring';
  } else if (input.includes('夏')) {
      season = 'summer';
  } else if (input.includes('秋')) {
      season = 'fall'; // or 'autumn'
  } else if (input.includes('冬')) {
      season = 'winter';
  }

  // 結果をフォーマットして返す
  return `${year}-${season}`;
}

// 使用例
const input = '3年前の夏';
console.log(parseDate(input)); // "2021-summer"
