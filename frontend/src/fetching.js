export async function FetchingSegmentation(imageFile) {
  const formData = new FormData();
  formData.append('file', imageFile);

  try {
    const response = await fetch('http://localhost:5000/segment', {
      method: 'POST',
      body: formData,
    });

    if (!response.ok) {
      throw new Error('Failed to segment');
    }

    const data = await response.json();
    return data.result
  } catch (error) {
    console.error(error.message || 'failed to segment');
  }
}

export async function FetchingColorization(imageFile){
  const formData = new FormData();
  formData.append('file', imageFile)

  try{
    const response = await fetch('http://localhost:5000/colorize' ,{
      method: "POST",
      body: formData,
    })
    
    if (!response.ok){
      throw new Error('Failed to colorize')
    }
    const data = await response.json()
    return data.result
  } catch(error){
    console.error(error.message || 'failed to colorize');
  }
} 

export async function FetchingRandomization(){
  try {
    const response = await fetch('http://localhost:5000/generate_face')

    if (!response.ok){
      throw new Error('Failed to Randomize Face')
    }
    const data = await response.json()
    return data.result
  } catch(error){
    console.error(error.message || 'failed to randomize face')
  }
}