const fs = require('fs')

fs.readFile('clippings.txt', 'utf-8', (err, text) => {
  if(err) return
  text = text.replace(/[|]/g, '-')
  const clips = text.split('==========')
  console.log(clips.length)

  let regex = /\s*(?<book>[\w*\s*]*) \((?<author>[\w*\s*]+)\)\s*- Your Highlight at location (?<location>\d*-\d*) - Added on .*, \d{2} \w* \d{4} (?<time>\d\d:\d\d:\d\d)\s*(?<text>.*)\s*/g
  let regex2 = /\s*(?<book>[\w*\s*]*)\w*\(z-lib.org\)\s*- Your Highlight on page (?<location>\d*-\d*) - Added on .*, \d{2} \w* \d{4} (?<time>\d\d:\d\d:\d\d)\s*(?<text>.*)\s*/g
  let res = regex.exec(text)
  let res2 = regex2.exec(text)
  let count = 0
  let json_clips = []
  let json_by_book = {}
  do {
    count += 1
    console.log(`${res.groups.author}`);
    json_clips.push({
      'text': res.groups.text ,
      'author': res.groups.author,
      'book': res.groups.book 
    })
    let curr_book
    if(res.groups.book in json_by_book) curr_book = json_by_book[res.groups.book]
    else {
      json_by_book[res.groups.book] = {}
      curr_book = json_by_book[res.groups.book]
    }
    if ('highlights' in curr_book) curr_book.highlights.push(res.groups.text)
    else curr_book.highlights = [res.groups.text] 

  } while((res = regex.exec(text)) !== null);
  console.log(count)

  while((res2 = regex2.exec(text)) !== null) {
    count += 1
    let res = res2
    console.log(`${res.groups.author}`);
    json_clips.push({
      'text': res.groups.text ,
      'author': res.groups.author,
      'book': res.groups.book 
    })
    let curr_book
    if(res.groups.book in json_by_book) curr_book = json_by_book[res.groups.book]
    else {
      json_by_book[res.groups.book] = {}
      curr_book = json_by_book[res.groups.book]
    }
    if ('highlights' in curr_book) curr_book.highlights.push(res.groups.text)
    else curr_book.highlights = [res.groups.text] 

  }
  console.log(count)
  
  // const json_clips = clips.splice(0, 3).map(c => { 
  //   // console.log(c.replace('|', '-'))
  //   let regexResults = regex.exec(c.replace('|', '-'))
  //   // console.log(regexResults)
  //   if(regexResults) {
  //     // console.log(regexResults.groups.text)
  //     return {
  //       'text': regexResults.groups.text || 'text',
  //       'author': regexResults.groups.author || 'author'
  //     }
  //   }
  //   else {
  //     return {
  //       'text': 'text',
  //       'author': 'author'
  //     }
  //   }
  // })
  // console.log(json_clips)
  const clip_data = JSON.stringify(json_clips)
  fs.writeFile('clippings.json', clip_data, err => {
    if(err) return
  })
  let book_data = []
  Object.keys(json_by_book).forEach((key, index) => {
    const book = {
      id: index,
      name: key,
      highlights: json_by_book[key].highlights
    }
    book_data.push(book)
  })
  book_data = JSON.stringify(book_data)
  fs.writeFile('books.json', book_data, err => {
    if(err) return
  })
})