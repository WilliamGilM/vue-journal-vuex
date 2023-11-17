import cloudinary from 'cloudinary'
import axios from 'axios'

import uploadImage from '@/modules/daybook/helpers/uploadImage'

cloudinary.config({
  cloud_name: 'dsbmzflnt',
  api_key: '958299613165198',
  api_secret: 'G468DTY6ozpu6e2GrH0tVhcO67Y'
})

describe('Pruebas en el uploadImage', () => {

  test('debe de cargar un archivo y retornar el url', async() => {

    const { data } = await axios.get('https://res.cloudinary.com/dsbmzflnt/image/upload/v1692074593/cld-sample-3.jpg', {
      responseType: 'arraybuffer'
    })

    const file = new File([ data ], 'foto.jpg')

    const url = await uploadImage(file)

    expect( typeof url ).toBe('string')

    // Tomar el id de la imagen
    const segments = url.split('/')
    const imageId = segments[segments.length -1].replace('.jpg','')
    // cloudinary.v2.api.delete_resources( imageId, {}, () => {
    //  done()
    // })

    //Con las nuevas versiones de jest no se puede usar donde con async function
    // eliminar la imagen del clouddinary
    await cloudinary.v2.api.delete_resources(imageId);

  })   
})