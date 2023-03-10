export const getHeaders = () => {
    let token = ''
    if (import.meta.env.MODE === 'dev') {
        token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0ZW5hbnRfaWQiOiIwMDAwMDAiLCJ1c2VyX25hbWUiOiJhZG1pbiIsInJlYWxfbmFtZSI6IueuoeeQhuWRmCIsImF2YXRhciI6Imh0dHBzOi8vZ3cuYWxpcGF5b2JqZWN0cy5jb20vem9zL3Jtc3BvcnRhbC9CaWF6ZmFueG1hbU5Sb3h4VnhrYS5wbmciLCJhdXRob3JpdGllcyI6WyJhZG1pbmlzdHJhdG9yIl0sImNsaWVudF9pZCI6InNhYmVyIiwicm9sZV9uYW1lIjoiYWRtaW5pc3RyYXRvciIsImxpY2Vuc2UiOiJwb3dlcmVkIGJ5IGJsYWRleCIsInNob3BfaWQiOiJNRDAwMDAwMTYwIiwicG9zdF9pZCI6IjExMjM1OTg4MTc3Mzg2NzUyMDEiLCJ1c2VyX2lkIjoiMTEyMzU5ODgyMTczODY3NTIwMSIsInJvbGVfaWQiOiIxMTIzNTk4ODE2NzM4Njc1MjAxIiwic2NvcGUiOlsiYWxsIl0sIm5pY2tfbmFtZSI6IueuoeeQhuWRmCIsIm9hdXRoX2lkIjoiIiwiZGV0YWlsIjp7InR5cGUiOiJ3ZWIifSwiZXhwIjoxNjc4NTk4OTM5LCJkZXB0X2lkIjoiMTEyMzU5ODgxMzczODY3NTIwMSIsImp0aSI6IjQ3MzllMDQ1LWJiYmEtNDg3Yy04OGY3LTRhNmFjNTllZTAwMiIsImFjY291bnQiOiJhZG1pbiJ9.EeDk6mdqtbm09DdLRn7iFkjv1g4M7QwCoxEVXCfoSQc"
    } else token = JSON.parse(localStorage.getItem("saber-token")).content;
    return {
        Authorization: `Basic ${window.btoa(decodeURIComponent(encodeURIComponent('saber:saber_secret')))}`,
        'Blade-Auth': 'bearer ' + token
    }
}

let timer = null
export const debounce = (fn) => {
    return () => {
        clearTimeout(timer)
        timer = setTimeout(() => fn(), 2000)
    }
}