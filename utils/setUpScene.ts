import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
import { FontLoader} from 'three/examples/jsm/loaders/FontLoader'
import {TextGeometry} from 'three/examples/jsm/geometries/TextGeometry'

export class MainScene  {
    scene : THREE.Scene;
    camera : THREE.PerspectiveCamera;
    renderer : THREE.WebGLRenderer;
    imageLoader : THREE.TextureLoader;
    light: THREE.DirectionalLight;
    // controls : OrbitControls;
    sceneMeshes: THREE.Mesh[]; //for raycasting
    sceneBoxes: THREE.Box3[];
    gltfLoader : GLTFLoader
    

    constructor() {
        this.scene = new THREE.Scene();
        this.scene.background = new THREE.Color(0xffffff);
        this.scene.fog = new THREE.Fog(0xffffff, 1, 1000);
        
        this.scene.add(new THREE.AmbientLight(0xffe0f3, 0.5));
        // this.scene.add(new THREE.HemisphereLight(0xffffff, 0xffffff, 0.5));
        this.light = new THREE.DirectionalLight(0xffe0f3, 1);
        // this.light.position.set(10, 10, 10);
        // this.light.castShadow = true;
        
        this.scene.add(this.light);
        this.camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
        this.camera.position.set(5,5,8);
        this.renderer = new THREE.WebGLRenderer({antialias: true});
        this.renderer = new THREE.WebGLRenderer()
        // this.renderer.physicallyCorrectLights = true
        this.renderer.shadowMap.enabled = true
        this.renderer.outputEncoding = THREE.sRGBEncoding
        this.renderer.setSize(window.innerWidth, window.innerHeight)
        document.body.appendChild(this.renderer.domElement)
        this.imageLoader = new THREE.TextureLoader();
        // this.controls = new OrbitControls(this.camera, this.renderer.domElement);
        // this.controls.enableDamping = true
        // this.controls.dampingFactor = 0.03
        // this.controls.minAzimuthAngle = Math.PI + Math.PI /4
        // this.controls.maxAzimuthAngle = Math.PI /2
        // this.controls.minPolarAngle = Math.PI /4
        // this.controls.maxPolarAngle = Math.PI /2
        // this.controls.maxDistance = 20
        // this.controls.minDistance = 2
        this.sceneMeshes = []
        this.sceneBoxes = []
        this.gltfLoader = new GLTFLoader()

    }   

    // constructGround() {
        
    //     const planeGeometry = new THREE.PlaneGeometry(100,100)
    //     const plane = new THREE.Mesh(planeGeometry, new THREE.MeshPhongMaterial( { color: 0x9D8E7E, transparent: true, opacity: 0.4 } ))
    //     plane.rotateX(-Math.PI / 2)
    //     plane.receiveShadow = true
    //     plane.castShadow = true
        
    //     plane.position.set(0,0.01,-40)
        
    //     this.scene.add(plane)
    //     this.sceneMeshes.push(plane)
    //     console.log('constructGround')
    // }

    constructSkybox() {
        const mats = [
            'images/clouds1_north.png', //those are strings with urls, for example: "https://threejs.org/examples/textures"/uv_grid_opengl.jpg
            'images/clouds1_south.png',
            'images/clouds1_up.png',
            'images/clouds1_down.png',
            'images/clouds1_west.png',
            'images/clouds1_east.png',
        ].map(pic => {
        return new THREE.MeshLambertMaterial({map: this.imageLoader.load(pic), side: THREE.BackSide});
        });
        const geom = new THREE.BoxBufferGeometry(1000,1000,1000);
        const box = new THREE.Mesh(geom, mats);
        this.scene.add(box)
    }

    constructBanner() {
        const photoMap = [
            'images/photo.jpg', //those are strings with urls, for example: "https://threejs.org/examples/textures"/uv_grid_opengl.jpg
            'images/photo.jpg','images/blank.png','images/blank.png','images/blank.png','images/blank.png'
        ].map(pic => {
          return new THREE.MeshLambertMaterial({map: this.imageLoader.load(pic)});
        });
        const billBoard = new THREE.Mesh( new THREE.BoxGeometry( 0.1, 3.7,2.8 ), photoMap )
        billBoard.position.set(-5.4,2,-10)
        this.scene.add(billBoard)
        
        const photo1Map = [
            'images/photo1.jpg', //those are strings with urls, for example: "https://threejs.org/examples/textures"/uv_grid_opengl.jpg
            'images/photo1.jpg','images/blank.png','images/blank.png','images/blank.png','images/blank.png'
        ].map(pic => {
          return new THREE.MeshLambertMaterial({map: this.imageLoader.load(pic)});
        });
        const billBoard1 = new THREE.Mesh( new THREE.BoxGeometry( 0.1, 3.7,2.8 ), photo1Map )
        billBoard1.position.set(-5.4,2,-6.5)
        this.scene.add(billBoard1)
    }

    constructButtons() {
        ///// BUTTONS /////
        // const cube2 = new THREE.Mesh( new THREE.BoxGeometry( .5, 0.1, .5 ), new THREE.MeshPhongMaterial( { color: 0xffff00 } ) )
        // cube2.position.set(0,0,0)
        // cube2.castShadow = true
        // cube2.receiveShadow = true
        // let cube2BB = new THREE.Box3(new THREE.Vector3(), new THREE.Vector3()) //bounding box
        // cube2BB.setFromObject(cube2)
        // // console.log(cube2BB)
        // this.scene.add(cube2)

        // const cube3 = new THREE.Mesh( new THREE.BoxGeometry( 0.5, 0.1, 0.5 ), new THREE.MeshPhongMaterial( { color: 0xffffff } ) )
        // cube3.position.set(0,0,-10)
        // cube3.castShadow = true
        // cube3.receiveShadow = true
        // let cube3BB = new THREE.Box3(new THREE.Vector3(), new THREE.Vector3()) //bounding box
        // cube3BB.setFromObject(cube3)

        // this.scene.add(cube3)

        // const cube4 = new THREE.Mesh( new THREE.BoxGeometry( 0.5, 0.1, 0.5 ), new THREE.MeshPhongMaterial( { color: 0xffffff } ) )
        // cube4.position.set(0,0,-20)
        // cube4.castShadow = true
        // cube4.receiveShadow = true
        // let cube4BB = new THREE.Box3(new THREE.Vector3(), new THREE.Vector3()) //bounding box
        // cube4BB.setFromObject(cube4)

        // this.scene.add(cube4)
        let zValue = 5
        let xValue = -13
        for (let i = 0; i < 5; i++) {
            const cube = new THREE.Mesh( new THREE.BoxGeometry( 2, 2, 2 ), new THREE.MeshPhongMaterial( { color: 0xa06a6a, emissive: 0xaf3232, shininess:600, reflectivity:0.7} ) )
            cube.position.set(xValue,0,zValue)
            console.log(Math.log(xValue))
            cube.castShadow = true
            cube.receiveShadow = true
            let cubeBB = new THREE.Box3(new THREE.Vector3(), new THREE.Vector3()) //bounding box
            cubeBB.setFromObject(cube)
            
            xValue -= 8
            
            this.scene.add(cube)
            this.sceneBoxes.push(cubeBB)
        }

       
    }

    constructText(textDisplay: string, x: number, y: number, z: number) {
        const chars = new THREE.Group()

        let text = textDisplay
        const loader = new FontLoader()
        loader.load('fonts/Fascinate_Regular.json', function(font) {
            const fontOptions = {
                font: font,
                size: 0.5,
                height: 0.1,
                curveSegments: 12,
                bevelEnabled: true,
                bevelThickness: 0.1,
                bevelSize: 0.1,
                bevelSegments: 5
        } 

        const letters = Array.from(text).reverse()

        letters.forEach((letter, index) => {
            const textGeometry = new TextGeometry(letter, fontOptions)
            const textMaterial = [
                new THREE.MeshPhongMaterial({ emissive: 0xaf3232, shininess:600, reflectivity:0.7}),
                new THREE.MeshPhongMaterial({color: 0xf012ff, emissive: 0xaf3232, shininess:600, reflectivity:0.7}),
            ]
            const textMesh = new THREE.Mesh(textGeometry, textMaterial)
            textMesh.name = index.toString()
            let xPos = x -0.7*index 
            textMesh.position.set(xPos,y,z)
            chars.add(textMesh)
            })
            
        })
        console.log(chars)
        this.scene.add(chars)
    }
    
}