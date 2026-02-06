const ones = ['', 'One', 'Two', 'Three', 'Four', 'Five', 'Six', 'Seven', 'Eight', 'Nine'];
const tens = ['', '', 'Twenty', 'Thirty', 'Forty', 'Fifty', 'Sixty', 'Seventy', 'Eighty', 'Ninety'];
const teens = ['Ten', 'Eleven', 'Twelve', 'Thirteen', 'Fourteen', 'Fifteen', 'Sixteen', 'Seventeen', 'Eighteen', 'Nineteen'];

function convertLessThanThousand(num) {
  if (num === 0) return '';
  
  let result = '';
  
  if (num >= 100) {
    result += ones[Math.floor(num / 100)] + ' Hundred ';
    num %= 100;
  }
  
  if (num >= 20) {
    result += tens[Math.floor(num / 10)] + ' ';
    num %= 10;
  } else if (num >= 10) {
    result += teens[num - 10] + ' ';
    return result.trim();
  }
  
  if (num > 0) {
    result += ones[num] + ' ';
  }
  
  return result.trim();
}

export function numberToIndianWords(num) {
  if (num === 0) return 'Zero Rupees Only';
  
  let crore = Math.floor(num / 10000000);
  num %= 10000000;
  
  let lakh = Math.floor(num / 100000);
  num %= 100000;
  
  let thousand = Math.floor(num / 1000);
  num %= 1000;
  
  let remainder = num;
  
  let result = 'Rupees ';
  
  if (crore > 0) {
    result += convertLessThanThousand(crore) + ' Crore ';
  }
  
  if (lakh > 0) {
    result += convertLessThanThousand(lakh) + ' Lakh ';
  }
  
  if (thousand > 0) {
    result += convertLessThanThousand(thousand) + ' Thousand ';
  }
  
  if (remainder > 0) {
    result += convertLessThanThousand(remainder) + ' ';
  }
  
  return result.trim() + ' Only';
}

export function generateReceiptNumber() {
  const year = new Date().getFullYear();
  const random = Math.floor(Math.random() * 10000).toString().padStart(4, '0');
  return `REC${year}${random}`;
}

export function formatDate(date) {
  const d = new Date(date);
  const day = String(d.getDate()).padStart(2, '0');
  const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  const month = monthNames[d.getMonth()];
  const year = d.getFullYear();
  return `${day}-${month}-${year}`;
}
