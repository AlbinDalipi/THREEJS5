/*

ObjectModel = Backbone.Model.extend({

    initialize : function () {

        console.log("created");

    }});

ObjectCollection = Backbone.Collection.extend({
    url: 'http://localhost:3000/api/contacts',
    model: ObjectModel,


});

var objectsCollection = new ObjectCollection();



//view of one object
var ObjectView = Backbone.View.extend({


    model: new ObjectModel(),
    tagName: 'tr',
    initialize: function() {
        this.template = _.template($('.objects-list-template').html());
    },
    events: {
        'click .edit-contact': 'edit',
        'click .update-contact': 'update',
        'click .cancel': 'cancel',
        'click .delete-contact': 'delete'
    },
    edit: function() {
        $('.edit-contact').hide();
        $('.delete-contact').hide();
        this.$('.update-contact').show();
        this.$('.cancel').show();

        var name = this.$('.name').html();

        this.$('.name').html('<input type="text" class="form-control name-update" value="' + name + '">');
    },
    update: function() {
        this.model.set('name', $('.name-update').val());


    },
    cancel: function() {
        objectsView.render();
    },
    delete: function() {
        this.model.destroy();
    },
    render: function() {
        this.$el.html(this.template(this.model.toJSON()));
        return this;
    }
});


//view of all objects

var ObjectsView = Backbone.View.extend({
    model: objectsCollection,
    el: $('.contacts-list'),
    initialize: function() {
        var self = this;
        this.model.on('add', this.render, this);
        this.model.on('change', function() {
            setTimeout(function() {
                self.render();
            }, 30); //delays the other functions for 30  so all values can register
        },this);
        this.model.on('remove', this.render, this);

        this.model.fetch();
    },
    render: function() {
        var self = this;
        this.$el.html('');
        _.each(this.model.toArray(), function(objectModel) {
            self.$el.append((new ObjectView({model: objectModel})).render().$el);
        });
        return this;
    }
});

var objectsView = new ObjectsView();

$(document).ready(function() {
    $('.add-contact').on('click', function() {
        var objectModel = new ObjectModel({
            name: $('.name-input').val()
        });
        $('.name-input').val('');
        objectsCollection.add(objectModel);

    });
})


$(document).ready(function() {
    $('.add-contact').on('click', function() {
        var objectModel = new ObjectModel({
            name: $('.name-input').val(),
        });
        $('.name-input').val('');
        objectsCollection.add(objectModel);

    });
})



//setup scene
var scene = new THREE.Scene();
//setup camera
var camera = new THREE.PerspectiveCamera(75,window.innerWidth/window.innerHeight,0.1 , 1000);
camera.position.z = 5;
//setup renderer
var renderer = new THREE.WebGLRenderer({antialias : true});
renderer.setClearColor("#e5e5e5");
renderer.setSize(window.innerWidth,window.innerHeight);

//create a canvas
document.body.appendChild(renderer.domElement);
//update the following every time we resize
window.addEventListener('resize',() => {
    renderer.setSize(window.innerWidth,window.innerHeight);
    camera.aspect = window.innerWidth/window.innerHeight;

    camera.updateProjectionMatrix();
})
/!*



//transform control
control = new THREE.TransformControls( camera, renderer.domElement );
control.addEventListener( 'change', render );
control.attach( mesh );
scene.add( control );



*!/


//define geometry
var geometry =  new THREE.BoxGeometry(1,1,1); //radius,width,height
//define material
var material = new THREE.MeshLambertMaterial({color: 0xFFCC00});
//define the mesh
var mesh = new THREE.Mesh(geometry,material);
var objectCollection = new ObjectCollection();
scene.add(mesh);

//add orbit controls

control = new THREE.OrbitControls( camera, renderer.domElement );
control.update();
control.addEventListener( 'change', render );



//add light

var light = new THREE.PointLight(0xFFFFFF,1,700) //color,intensity,distance
//add light position
light.position.set(10,0,25)

function AddCube() {

    var cube = new THREE.Mesh(geometry, material);
    cube.position.x = (Math.random() - 0.5) * 10;
    cube.position.y = (Math.random() - 0.5) * 10;
    cube.position.z = (Math.random() - 0.5) * 10;
    scene.add(cube);
    camera.lookAt(cube.position);
    //assign attributes to the new model
    var objectModel = new ObjectModel({

        Name : 'cube',
        uuid : cube.uuid,
        Position : cube.position,
        Rotation : cube.rotation,

    });

    //add model to collection instance
    objectCollection.add(objectModel);

    //assign a view to the model and render
    var objectView = new ObjectView({el : "#container"});
    objectView.render();

}
function AddSphere(){

    var mesh = new THREE.Mesh( new THREE.SphereGeometry(0.8,20,20), material);
    mesh.position.x = (Math.random() - 0.5) * 10;
    mesh.position.y = (Math.random() - 0.5) * 10;
    mesh.position.z = (Math.random() - 0.5) * 10;
    scene.add(mesh);
    camera.lookAt(mesh.position);

}

scene.add(light);

var render = function(){
    requestAnimationFrame(render);
    mesh.rotation.x += 0.05;
    renderer.render(scene,camera);
}
render();



*/
