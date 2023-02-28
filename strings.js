export function toLower(str){
    let s = str.search(/[a-zа-я]/i)
    return str.slice(0, s) + str.charAt(s).toUpperCase() + str.slice(s+1).toLowerCase()
}

export function correct(str){
    return str.replaceAll(/\s*([.,!?:;])\s*|\s+/g, "$1 ")
}

export function countWords(str){
    let reg = /[a-zа-я]+/gi
    let count = 0
    while(reg.test(str))count++
    return count
}

export function countRepeats(str){
    let arr = str.matchAll(/[a-zа-я]+/gi)
    let res = {}
    for(let i of arr){
        i = i[0].toLowerCase()
        res[i] = (res[i] ?? 0) + 1
    }
    return res
}