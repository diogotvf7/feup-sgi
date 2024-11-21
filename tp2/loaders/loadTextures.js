import * as THREE from 'three';

export const loadTextures = {
    execute: function(data) {
        let textures = {};

        for (let key in data) {
            let isVideo = data[key].isVideo;
            let texture

            if ( isVideo ){
                let video = document.createElement('video')
                video.id = key
                video.src = data[key].filepath
                video.preload = "auto"
                video.autoplay = true
                video.loop = true
                video.muted = true
                video.style.display = 'none';

                document.body.appendChild(video)

                texture = new THREE.VideoTexture(video)
                texture.colorSpace = THREE.SRGBColorSpace   
            }
            else if ( data[key].mipmap0 ) {
                texture = new THREE.TextureLoader().load(data[key].filepath);
                texture.generateMipmaps = false
                for( let i = 0; i <= 7; i++) {
                    this.loadMipmap(texture, i, data[key][`mipmap${i}`])
                }
                texture.needsUpdate = true
            } else {
                texture = new THREE.TextureLoader().load(data[key].filepath);
                texture.generateMipmaps = true;
                texture.minFilter = THREE.LinearMipMapLinearFilter;
                texture.magFilter = THREE.NearestFilter;
                texture.needsUpdate = true;
            }
            textures[key] = texture
        }
        return textures;
    },

    loadMipmap: function(parentTexture, level, path) {
        new THREE.TextureLoader().load(path, 
            function(mipmapTexture)  
            {
                const canvas = document.createElement('canvas')
                const ctx = canvas.getContext('2d')
                ctx.scale(1, 1);
                
                const img = mipmapTexture.image         
                canvas.width = img.width;
                canvas.height = img.height

                ctx.drawImage(img, 0, 0 )
                             
                parentTexture.mipmaps[level] = canvas
            },
            undefined, 
            function(err) {
                console.error('Unable to load the image ' + path + ' as mipmap level ' + level + ".", err)
            }
        )
    }
};
