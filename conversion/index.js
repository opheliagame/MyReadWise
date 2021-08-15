const fs = require('fs')

fs.readFile('clippings.txt', 'utf-8', (err, text) => {
  if(err) return
  text = text.replace(/[|]/g, '-')
  const clips = text.split('==========')
  console.log(clips.length)

  let regex = /\s*(?<book>[\w*\s*]+) \((?<author>[\w*\s*]+)\)\s*- Your Highlight at location (?<location>\d*-\d*) - Added on .*, \d{2} \w* \d{4} (?<time>\d\d:\d\d:\d\d)\s*(?<text>.*)\s*/g
  let res = regex.exec( text)
  let count = 0
  let json_clips = []
  do {
    count += 1
    console.log(`${res.groups.author}`);
    json_clips.push({
      'text': res.groups.text ,
      'author': res.groups.author,
      'book': res.groups.book 
    })
  } while((res = regex.exec(text)) !== null);
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
  const data = JSON.stringify(json_clips)
  fs.writeFile('clippings.json', data, err => {
    if(err) return
  })
})