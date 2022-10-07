// cargo_weight => weight + div 분리
// ex) 10kg => 10, kg
export const convertWeightAndDiv = (str) => {
  if (str === null || str === undefined) return ""

  const div = [
    "kg", "Kg", "kG", "KG", "t", "T"
  ]

  let result = {
    weight: "0",
    div: ""
  }

  div.forEach(d => {
    if (str.includes(d)) {
      result.weight = str.substring(0, str.indexOf(d))
      result.div = d.toLowerCase()
    }
  })

  return result
}

// null || undefined || 빈문자열 || 공백일 때 return true
// 아니면 return false
export const isEmpty = (str) => {
  return str === null || str === undefined || str === "" || str.trim() === ""
}