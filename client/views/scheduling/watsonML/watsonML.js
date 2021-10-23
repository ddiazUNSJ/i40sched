import JSONEditor from 'jsoneditor';
Template.watsonML.rendered = function () {

    // Add slimscroll to element
    $('.scroll_content').slimscroll({
        height: '200px'
    })


    // var barData = {
    //     labels: ["January", "February", "March", "April", "May", "June", "July"],
    //     datasets: [
    //         {
    //             label: "Data 1",
    //             backgroundColor: 'rgba(220, 220, 220, 0.5)',
    //             pointBorderColor: "#fff",
    //             data: [65, 59, 80, 81, 56, 55, 40]
    //         },
    //         {
    //             label: "Data 2",
    //             backgroundColor: 'rgba(26,179,148,0.5)',
    //             borderColor: "rgba(26,179,148,0.7)",
    //             pointBackgroundColor: "rgba(26,179,148,1)",
    //             pointBorderColor: "#fff",
    //             data: [28, 48, 40, 19, 86, 27, 90]
    //         }
    //     ]
    // };

    // var barOptions = {
    //     responsive: true
    // };


    // var ctx2 = document.getElementById("barChart").getContext("2d");
    // new Chart(ctx2, {type: 'bar', data: barData, options:barOptions});


  const container = document.getElementById('jsoneditor')

  const options = {
    mode: 'view'
  }

  const json = {
    'array': [1, 2, 3],
    'boolean': true,
    'null': null,
    'number': 123,
    'object': {'a': 'b', 'c': 'd'},
    'string': 'Hello World'
  }

  const editor = new JSONEditor(container, options, json)


};

Template.watsonML.events({
    'click #verToken': function(){
        //var jsonId = Problema.findOne({"_id": this._id } , { fields: { SolJsonfileId: 1}}).SolJsonfileId;
        console.log( "ver token id ");
        Meteor.call( 'loginToken',function (error, result){ 
            if (error){
                 console.log(error);
            }
            else{
                access_token=JSON.parse(result)["access_token"];
                console.log(result);
                console.log(access_token);
                Session.set('Atoken', access_token);
                  const container = document.getElementById('jsoneditor')
                  const json = access_token;
                  const options = {
                    mode: 'view'
                  }
                  const editor = new JSONEditor(container, options, json)
                }
         });
    },
    'click #verJob': function(){
        //var jsonId = Problema.findOne({"_id": this._id } , { fields: { SolJsonfileId: 1}}).SolJsonfileId;
        console.log( "ver job");
        Meteor.call( 'getJob',Session.get('Atoken') ,function (error, result){ 
            if (error){
                 console.log(error);
            }
            else{
                
                console.log(result);
                
                  const container = document.getElementById('jsoneditor')
                  const json = result;
                  const options = {
                    mode: 'view'
                  }
                  const editor = new JSONEditor(container, options, json)
                }
         });
    }
});

 