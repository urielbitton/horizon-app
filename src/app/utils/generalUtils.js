
export const addLeadingZeros = (number) => {
  return number < 10 ? "0"+number : number
}

export const truncateText = (text, charsNum) => {
  return text?.length > charsNum ? (text?.slice(0,charsNum) + "...") : text
}

export const fileTypeConverter = (string) => {
  if(string.includes('wordprocessingml')) 
    return {icon:'fas fa-file-word', color: '#2194ff', name: 'Word'}
  else if(string.includes('spreadsheetml')) 
    return {icon: 'fas fa-file-excel', color: '#73d609', name: 'Excel'}
  else if(string.includes('presentationml'))
    return {icon: 'fas fa-file-powerpoint', color: '#ff640a', name: 'PowerPoint'}
  else if(string.includes('pdf'))
    return {icon: 'fas fa-file-pdf', color: '#ff0a37', name: 'PDF'}
  else if(string.includes('audio'))
    return {icon: 'fas fa-file-audio', color: '#a74aff', name: 'Audio'}
  else if(string.includes('image'))
    return {icon: 'fas fa-file-image', color: '#ffc219', name: 'Image'}
  else if(string.includes('zip-compressed'))
    return {icon: 'fas fa-file-archive', color: '#ff8e24', name: 'Zip'}
  else
    return {icon: 'fas fa-file-alt', color: '#0febff', name: 'Other'}
}

export const uploadFileLocal = (inputRef, maxSize, setFile) => {
  let file = inputRef.current.files[0]
  if(file?.size <= maxSize) {  //30mb max
    let reader = new FileReader()
    reader.onloadend = function(){
      setFile(reader.result)
    } 
    if(file) {
      reader.readAsDataURL(file)
    } 
  }
  else {
    alert(`File is too large (maximum size allowed: ${'x'}MB)`)
  }
} 

export const formatPhoneNumber = (phoneNumberString) => {
  let cleaned = ('' + phoneNumberString).replace(/\D/g, '')
  let match = cleaned.match(/^(\d{3})(\d{3})(\d{4})$/)
  if(match) {
    return '(' + match[1] + ') ' + match[2] + '-' + match[3]
  }
  return null
}