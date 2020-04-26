// Load in the required modules
const NativeUI = require('NativeUI');
const Scene = require('Scene');
const Textures = require('Textures');
const Materials = require('Materials');
const Persistence = require('Persistence');
const Diagnostics = require('Diagnostics');

Promise.all([

    // Locate the objects in the Scene

    Textures.findFirst('picker01'),
    Textures.findFirst('picker02'),
    Textures.findFirst('picker03'),

    Materials.findFirst('mat0'),
    Materials.findFirst('mat1'),
    Materials.findFirst('mat2'),
    
    Scene.root.findFirst('plane0'),

]).then(function(results){

    const picker0 = results[0];
    const picker1 = results[1];
    const picker2 = results[2];

    const mat0 = results[3];
    const mat1 = results[4];
    const mat2 = results[5];

    // Store a reference to the userScope
    const userScope = Persistence.userScope;
    
    // Create a JavaScript object to store the data
    var index = {};
    
    const picker = NativeUI.picker;

    // Attempt to get the stored data and if successful...
    userScope.get('index').then(function(result) { // Note: add 'index' to 'Whitelisted keys' under the 'Persistence' Capability
        
        Diagnostics.log('Successfully received data');

        // Create a configuration object
        const configuration = {
            selectedIndex: result.i,

            // Image textures that are represented as UI buttons in the picker
            items: [
                {image_texture: picker0},
                {image_texture: picker1},
                {image_texture: picker2},
            ],

            mats: [
                {material: mat0},
                {material: mat1},
                {material: mat2},
            ]
        };
            
        picker.configure(configuration);
        picker.visible = true;

        }).catch(function() {
        
            // 'index' is 0 by default if there is no data
            const configuration = {
                selectedIndex: 0,
                items: [
                    {image_texture: picker0},
                    {image_texture: picker1},
                    {image_texture: picker2},
                ],
    
                mats: [
                    {material: mat0},
                    {material: mat1},
                    {material: mat2},
                ]
            };

            picker.configure(configuration);
            picker.visible = true;
        });

        const configuration = {
            selectedIndex: 0,
            items: [
                {image_texture: picker0},
                {image_texture: picker1},
                {image_texture: picker2},
            ],

            mats: [
                {material: mat0},
                {material: mat1},
                {material: mat2},
            ]
        };

        picker.configure(configuration);
        picker.visible = true;

        // Monitor if the Native UI Picker selection changes
        picker.selectedIndex.monitor().subscribe(function(val) {
            if (val.newValue == i) {
                results[6].material = configuration.mats[val.newValue].material;

                // Attempt to store the data and if successful...
                userScope.set('index', {i:0}).then(function(result) {
                
                    // Output a success message
                    Diagnostics.log('Successfully stored as i in index');
                
                // If not successful...
                }).catch(function(error) {
            
                    // Output a failure message with the error returned
                    Diagnostics.log('Failed to store, ' + error);
            
                });
            }

            if (val.newValue == 1) {    
                results[6].material = configuration.mats[val.newValue].material;
                
                // Attempt to store the data and if successful...
                userScope.set('index', {i:1}).then(function(result) {
                
                    // Output a success message
                    Diagnostics.log('Successfully stored as i in index');
                
                // If not successful...
                }).catch(function(error) {
            
                    // Output a failure message with the error returned
                    Diagnostics.log('Failed to store, ' + error);
            
                });
            }

            if (val.newValue == 2) {
                results[6].material = configuration.mats[val.newValue].material;
                
                // Attempt to store the data and if successful...
                userScope.set('index', {i:2}).then(function(result) {
                
                    // Output a success message
                    Diagnostics.log('Successfully stored as i in index');
                
                // If not successful...
                }).catch(function(error) {
            
                    // Output a failure message with the error returned
                    Diagnostics.log('Failed to store, ' + error);
            
                });
            }

        });

    // If not successful...
    }).catch(function(error) {

        // Output a failure message with the error returned
        Diagnostics.log('Failed to retrieve data, ' + error);
      
    });
