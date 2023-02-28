function trimNum(str){
    let a = str.search(/[^0]/)
    if(a === -1){
        return '0'
    }
    a -= str[a] == '.'
    str = str.slice(a)
    let i = str.indexOf('.')
    if(i !== -1){
        a = str.search(/0*$/)
        a -= str[a - 1] == '.'
        str = str.slice(0, a)
    }else{
        i = str.length
    }
    return str
}

function sub(num1, num2){
    num2 = num2[0] == '-' ? num2.slice(1) : ('-' + num2)
    return add(num1, num2)
}

function add(num1, num2){
    let nm1 = num1[0] == '-'
    let nm2 = num2[0] == '-'

    if(nm1){
        num1 = num1.slice(1)
    }
    if(nm2){
        num2 = num2.slice(1)
    }

    num1 = trimNum(num1)
    num2 = trimNum(num2)

    if(nm1 && nm2){
        return '-' + addImpl(num1, num2)
    }else if(!nm1 && !nm2){
        return addImpl(num1, num2)
    }else if(nm1){
        return subImpl(num2, num1)
    }else{
        return subImpl(num1, num2)
    }

}
function addImpl(c, d){
    let [integ1, fract1 = ''] = c.split('.').map(e=>e.split(''))
    let [integ2, fract2 = ''] = d.split('.').map(e=>e.split(''))

    let fractRes
    let integRes = []

    let ost = 0
    let i
    if(fract1.length > fract2.length){
        i = fract2.length - 1
        fractRes = fract1.slice(fract2.length)
    }else{
        i = fract1.length - 1
        fractRes = fract2.slice(fract1.length)
    }
    for(; i >= 0; i--){
        let n = +fract1[i] + +fract2[i] + ost
        if(n > 9){
            n -= 10
            ost = 1
        }else{
            ost = 0
        }
        fractRes.unshift(n)
    }

    if(integ1.length < integ2.length){
        [integ1, integ2] = [integ2, integ1]
    }
    let a = integ1.length - 1, b = integ2.length - 1
    for(; b >= 0; a--, b--){
        let n = +integ1[a] + +integ2[b] + ost
        if(n > 9){
            n -= 10
            ost = 1
        }else{
            ost = 0
        }
        integRes.unshift(n)
    }
    
    let s = integ1.slice(0, integ1.length - integ2.length)
    for(let i = s.length - 1;ost; i--){
        if(i < 0){
            s.unshift(1)
            break
        }
        let f = +s[i] + ost
        if(f > 9){
            s[i] = 0
        }else{
            s[i] = f
            ost = 0
        }
    }
    return trimNum(s.concat(integRes, '.', fractRes).join(''))
}

function compareNumArrays(integ1, fract1, integ2, fract2){

    if(integ1.length != integ2.length){
        return integ1.length - integ2.length
    }

    for(let i = 0; i < integ1.length; i++){
        let t = integ1[i] - integ2[i]
        if(t != 0){
            return t
        }
    }

    let min = Math.min(fract1.length, fract2.length)
    for(let i = 0; i < min; i++){
        let t = fract1[i] - fract2[i]
        if(t != 0){
            return t
        }
    }
    
    return fract1.length - fract2.length
}

function subImpl(c, d){
    let [integ1, fract1 = ''] = c.split('.').map(e=>e.split(''))
    let [integ2, fract2 = ''] = d.split('.').map(e=>e.split(''))

    let minus = false

    if(compareNumArrays(integ1, fract1, integ2, fract2) < 0){
        [integ1, integ2] = [integ2, integ1];
        [fract1, fract2] = [fract2, fract1]
        minus = true
    }

    let fractRes
    let ost = 0
    let min
    if(fract1.length >= fract2.length){
        min = fract2.length
        fractRes = fract1.slice(fract2.length)
    }else{
        min = fract1.length
        fractRes = []
        for(let i = fract1.length; i < fract2.length-1; i++){
            fractRes.push(9 - fract2[i])
        }
        fractRes.push(10 - fract2.at(-1))
        ost = 1
    }

    for(let i = min - 1; i >= 0; i--){
        let s = fract1[i] - fract2[i] - ost
        if(s < 0){
            s += 10
            ost = 1
        }else{
            ost = 0
        }
        fractRes.unshift(s)
    }

    let integRes = []
    let a = integ1.length - integ2.length

    for(let i = integ1.length - 1; i - a >= 0; i--){
        let s = integ1[i] - integ2[i - a] - ost
        if(s < 0){
            s += 10
            ost = 1
        }else{
            ost = 0
        }
        integRes.unshift(s)
    }

    let s = integ1.slice(0, a)

    for(let i = s.length - 1;ost; i--){
        let f = s[i] - ost
        if(f < 0){
            s[i] = f + 10
        }else{
            s[i] = f
            ost = 0
        }
    }
    return (minus ? '-' : '') + trimNum(s.concat(integRes, '.', fractRes).join(''))
}

function mul(num1, num2){
    let minus = false
    if(num1[0] == '-'){
        minus = true
        num1 = num1.slice(1)
    }
    if(num2[0] == '-'){
        minus = !minus
        num2 = num2.slice(1)
    }

    num1 = trimNum(num1).split('')
    let point = num1.indexOf('.')
    if(point != -1){
        num1.splice(point, 1)
        point = num1.length - point
    }else{
        point = 0
    }
    num2 = trimNum(num2).split('')
    let f = num2.indexOf('.')
    if(f != -1){
        num2.splice(f, 1)
        point += num2.length - f
    }

    let res = []

    let x = num2.length-1
    let y = num1.length-1

    for(let i = x; i >= 0; i--){
        let resLen = res.length
        let ost = 0
        for(let j = y; j >= 0; j--){
            let f = num1[j] * num2[i] + +ost
            if(f > 9){
                [ost, f] = f.toString()
            }else{
                ost = 0
            }
            let ins = j - 1 + (resLen - (y + 1 + x - i - 1))
            if(ins >= 0 && resLen !== 0){
                let n = +res[ins] + +f
                if(n > 9){
                    n -= 10
                    ost++
                }
                res[ins] = n
            }else{
                res.unshift(f)
            }
        }
        if(ost){
            res.unshift(ost)
        }
    }
    if(point){
        res.splice(res.length - point, 0, '.')
    }
    return (minus? '-' : '') + trimNum(res.join(''))
}

function div(num1, num2){

    let minus = false
    if(num1[0] == '-'){
        minus = true
        num1 = num1.slice(1)
    }
    if(num2[0] == '-'){
        minus = !minus
        num2 = num2.slice(1)
    }

    num1 = trimNum(num1)

    num2 = trimNum(num2)
    if(num2 === '0' || num2 === '0'){
        return '0'
    }

    num1 = num1.split('')
    let point = num1.indexOf('.')
    point = point == -1 ? num1.length : point


    num2 = num2.split('')
    let point2 = num2.indexOf('.')
    if(point2 != -1){
        num2.splice(point2, 1)
    }else{
        point2 = num2.length
    }

    let numSplit = num2
    num2 = num2.join('')

    let a = num2.length - point2
    let b = a - (num1.length - point)
    if(b > 0){
        num1.splice(point, 1)
        num1.push(...Array.from({length: b}).fill(0))
        point += a
    }else if(a > 0){
        num1.splice(point, 1)
        num1.splice(point+a, 0, '.')
    }

    let end = Math.min(num2.length, point)
    let sm = num1.slice(0, end)
    num1.splice(0, end)
    let pointAdd = false
    let res = []

    for(let len=0, d=0;len < 10;len += d){

        let first = true
        while(compareNumArrays(sm, [], numSplit, []) < 0){
            if(!first){
                res.push(0)
            }else{
                first = false
            }
            
            t = num1.shift()
            if(t == '.'){
                sm = sm.length==1 && sm[0]==0 ? [] : sm
                pointAdd = true
                t = num1.shift()
                if(res.length == 0){
                    res.push(0)
                }
                res.push('.')
            }

            if(t == undefined){
                d = 1
                if(!pointAdd){
                    res.push('.')
                    pointAdd = true
                }
                sm.push(0)
            }else{
                sm.push(t)
            }
        }

        let prev = num2, i = 0
        for(let next = prev; compareNumArrays(sm, [], next.split(''), []) >= 0; prev = next, next = add(prev, num2), i++);
        
        res.push(i)
        sm = trimNum(sub(sm.join(''), prev))
        if(sm == '0'){
            sm = ''
            if( num1.length == 0){
                break
            }
        }
        sm = sm.split('')
    }
    return (minus? '-' : '') + trimNum(res.join(''))
}

