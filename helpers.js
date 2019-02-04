export const resizeCloudinaryImg = (image, width = 300, height = 200) => {
  if(!image) return null
  let array = image.split('/')
  array.splice(6, 0, `c_limit,h_${height},w_${width}`)
  const thumbnail = array.join('/')
  return thumbnail;
}