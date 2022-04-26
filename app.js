;(function() {
    const entrada = document.querySelector('#entrada')
    const barra = document.querySelector('.barra-lateral')
    
    var salida
    function crearSalida() {
      const elem = document.querySelector('#salida')
      const child = document.createTextNode('')
    
      elem.innerHTML = ''
      elem.appendChild(child) 
      salida = child
    }
    crearSalida()
    

    window.uiEncriptar = uiEncriptar
    window.uiDesencriptar = uiDesencriptar
    window.uiCopiar = uiCopiar
    
    entrada.oninput = uiLetras
    
    function Cod(x) {
      switch(x) {
      case 'e': return 'enter'
      case 'i': return 'imes'
      case 'a': return 'ai'
      case 'o': return 'ober'
      case 'u': return 'ufat'
      default : return x
      }
    }
    
    function encriptar(s) {
      var r = ''
      for (const c of s) {
          r += Cod(c)
      }
      return r
    }
    
    function error() {
      throw new SyntaxError('codificación inválida')
    }
    
    function desencriptar(s) {
      var j = ''
      for (var x = 0; x < s.length;) {
        switch(s[x]) {
          case 'e':
            if (s[x + 4] === 'r') { j += s[x]; x += 5 }
            else { error() }
            break
          case 'i':
            if (s[x + 3] === 's') { j += s[x]; x += 4 }
            else { error() }
            break
          case 'a':
            if (s[x + 1] === 'i') { j += s[x]; x += 2 }
            else { error()}
            break
          case 'o':
            if (s[x + 3] === 'r') { j += s[x]; x += 4 }
            else { error() }
            break
          case 'u':
            if (s[x + 3] === 't') { j += s[x]; x += 4 }
            else { error() }
            break
          default:
            j += s[x++]
        }
      }
      return j
    }
    
    function mostrarResultado() {
      barra.classList.add('salidas')
    }
    
    function ocultarResultado() {
      barra.classList.remove('salidas')
    }
    
    const kUnAllowed = /[^a-z ]/g
    function uiLetras(ev) {
      const { inputType, target, data } = ev
      // caso más frecuente
      if (inputType === 'insertText') {
        kUnAllowed.lastIndex = 0
        if (kUnAllowed.test(data)) {
          let value = target.value
          target.value = value.substring(0, value.length - 1)
        }
      } else if(inputType === 'insertFromPaste') {
        let value = data || target.value || ''
        value = value.toLowerCase()
        target.value = value.replace(kUnAllowed, '')
      }
    }

    function uiEncriptar() {
        var txt = entrada.value
        entrada.value = ''
        if (txt.length === 0) {
          salida.nodeValue = ''
          ocultarResultado()
        } else {
          salida.nodeValue = encriptar(txt)
          mostrarResultado()
        }
      }
      
      const kClipboard = navigator.clipboard
      function uiCopiar() {
        if (kClipboard) {
          kClipboard
            .writeText(salida.nodeValue)
            .then(() => alert('Copiado Exitosamente'))
        }
      }
    
    function uiDesencriptar() {
      var txt = entrada.value
      entrada.value = ''
      if (txt.length === 0) {
        salida.nodeValue = ''
        ocultarResultado()
      } else {
        try {
          salida.nodeValue = desencriptar(txt)
        } catch(O_o) {
          salida.nodeValue = 'Error, no se puede reconocer la encriptacion'
        }
        mostrarResultado()
      }
    
    }
    
    
    }())