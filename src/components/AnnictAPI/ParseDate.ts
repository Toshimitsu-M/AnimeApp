export function parseDate(input: string): string {
  // 現在の年を取得
  const today = new Date();
  let year = today.getFullYear();
  let season: string = '';

  // 年の計算
  const beforeYearMatch = input.match(/(\d+)年前/);
  const afterYearMatch = input.match(/(\d+)年後/);
  const nextYearMatch = input.match(/来年/);
  if (beforeYearMatch) {
      year -= parseInt(beforeYearMatch[1], 10);
  } else if (afterYearMatch) {
    year += parseInt(afterYearMatch[1], 10);
  } else if (nextYearMatch) {
    year += 1;
  }


  // 季節の変換
  if (input.includes('春')) {
      season = 'spring';
  } else if (input.includes('夏')) {
      season = 'summer';
  } else if (input.includes('秋')) {
      season = 'autumn'; 
  } else if (input.includes('冬')) {
      season = 'winter';
  } else {
    const fourSeason: number = today.getMonth() + 1
    if (fourSeason === (1 || 2 || 3)) {
        season = 'winter'
    } else if (fourSeason === 4 || fourSeason === 5 || fourSeason === 6) {
        season = 'spring'
    } else if (fourSeason === 7 || fourSeason === 8 || fourSeason === 9) {
        season = 'summer'
    } else if (fourSeason === 10 || fourSeason === 11 || fourSeason === 12) {
        season = 'winter'
    }
  }

  // 結果をフォーマットして返す
  if (season !== '') {
    return `${year}-${season}`;
  } else {
    return `${year}`;
  }
  
}

// 使用例
const input = '3年前の夏';
console.log(parseDate(input)); // "2021-summer"
