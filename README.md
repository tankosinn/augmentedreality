[![MIT License](https://img.shields.io/badge/License-MIT-green.svg)](https://choosealicense.com/licenses/mit/)
![version](https://img.shields.io/badge/version-1.0.0-blue.svg) 

  
# Artırılmış Gerçeklik Tabanlı Hikaye
Artırılmış gerçeklik ve konuşma tanımlama ile birlikte çocuklara daha etkili dil öğretme amacı taşıyan bu projeyi gerekli konfigürasyonlar ile birlikte kendiniz için özelleştirebilir ve kullanabilirsiniz.


## Bağımlılıklar

- Node.js (Express)
- Python (Flask)


  
## Bilgisayarınızda Çalıştırın

Projeyi klonlayın

```bash
  git clone https://github.com/tankosinn/augmentedreality.git
```

Proje dizinine gidin

```bash
  cd my-project
```

storybook dizinine gidin

```bash
  cd storybook
```

Gerekli paketleri yükleyin

```bash
  npm install
```

Ana dizine gelerek speech-recognition dizinine gidin

```bash
  cd speech-recognition
```

Gerekli paketleri yükleyin

```bash
  pip install -r requirements.txt
```

  
## Dağıtım

Bu projeyi dağıtmak için öncelikle storybook dizinine gidin

```bash
  cd storybook
```
Sunucuyu ayağa kaldırın

```bash
  npm run dev
```

Ana dizine dönerek speech-recognition dizinine gidin


```bash
  cd speech-recognition
```

Sunucuyu ayağa kaldırın

```bash
  python app.py
```
  
## Kullanım/Örnekler

Aşağıdaki resmi indirerek, kameraya gösterdikten sonra artırılmış gerçeklik tabanlı sahneyi görüntüleyebilirsiniz.

https://img00.deviantart.net/6ce6/i/2012/160/0/d/happy_fox__with__svg__by_digitalcircuit-d51lm70.png


Kendi ses, sahne, resim hedefiniz vb. dosyalarınızı aşağıdaki klasör içerisinde tutabilirsiniz.

```bash
  storybook\public\assets
```
Kendi hedef resminizi oluşturmak için: https://hiukim.github.io/mind-ar-js-doc/tools/compile

Kendi hedef resminizi, chapter içerisinde ki target parametresinde dosya yolunu belirtebilirsiniz. 

```bash
  storybook\public\assets\targets
```

Kendi hikaye bölümlerinizi oluşturabilir, seslendirmeleri ve üç boyutlu animasyonlu sahnelerinizi ekleyebilirsiniz.

```bash
  storybook\public\javascripts\main.js
```

```javascript
  let dialogs = {
    // Chapter
    0: {
        // Dialog
        0: {
            dialog: "my-dialog",
            audio: "../assets/audio/dialogs/my-audio.mp3",
        },
    },
  }

  const chapters = {
    0: {
        scene: "../assets/models/my-scene/my-scene.gltf",
        target: "../assets/targets/my-target.mind",
        title: "my-chapter-title",
        subtitle: "my-sub-title",
        event: call_dialog, // call function
    },
  };
```

  
## İlişkili Projeler
MindAR: https://github.com/hiukim/mind-ar-js

Three.js: https://github.com/mrdoob/three.js/

Speech Recognition: https://pypi.org/project/SpeechRecognition/


  
## Lisans

[MIT](https://choosealicense.com/licenses/mit/)

  