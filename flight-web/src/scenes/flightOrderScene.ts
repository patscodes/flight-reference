import store from "../store";
import { SUBMIT } from "../store/orderReducer";
import { Scene } from "phaser";
import FormUtil from "../formutil/FormUtil";

export default class FlightOrderScene extends Scene {
  
  formUtil: FormUtil;
  lblFlightOrder: Phaser.GameObjects.Text;
  lblOrderID: Phaser.GameObjects.Text;
  lblAirline: Phaser.GameObjects.Text;
  timedEvent: Phaser.Time.TimerEvent;
  image1: Phaser.GameObjects.Image;
  image2: Phaser.GameObjects.Image;
  image3: Phaser.GameObjects.Image;

  create() {

    this.image1 = this.add.image(512, 384, 'sky1');
    this.image2 = this.add.image(512, 384, 'sky2');
    this.image3 = this.add.image(512, 384, 'sky3');

    this.timedEvent = this.time.addEvent({ delay: 3000, callback: this.onEvent, callbackScope: this, repeat: 100 });

    this.formUtil = new FormUtil({
        scene: this,
        rows: 9,
        cols: 9
    });
    //this.formUtil.showNumbers();

    this.lblFlightOrder = this.add.text(0,0,"Flight Order",{font: '48px Arial', color:'#8ED1A9', fontWeight: 'bold'});
    this.lblFlightOrder.setOrigin(0.5,0.5);

    this.lblOrderID= this.add.text(0,0,"Order ID",{font: '18px Arial', color:'#8ED1A9', fontWeight: 'bold'});
    this.lblOrderID.setOrigin(0.5, 0.5);

    this.lblAirline= this.add.text(0,0,"Airline",{font: '18px Arial', color:'#8ED1A9', fontWeight: 'bold'});
    this.lblAirline.setOrigin(0.5, 0.5);

    this.formUtil.alignGrid.placeAt(4,0.5, this.lblFlightOrder);
    this.formUtil.alignGrid.placeAt(2,2.15, this.lblOrderID);
    this.formUtil.alignGrid.placeAt(1,3.15, this.lblAirline);

    this.formUtil.scaleToGameW("orderID", .3);
    this.formUtil.placeElementAt(22, 'orderID', true);
    this.formUtil.scaleToGameW("airline", .5);
    this.formUtil.placeElementAt(31, "airline");
    this.formUtil.addOption("airline", "Singapore Airlines", "SIA");
    this.formUtil.addOption("airline", "Cathay Pacific", "CAT");
    this.formUtil.addOption("airline", "Delta Airways", "DEL");

    this.formUtil.scaleToGameW("btnSend", .25);
    this.formUtil.placeElementAt(40, "btnSend");
    this.formUtil.addClickCallback("btnSend", this.sendForm, this);
  }

  sendForm() {
    var airlineValue = this.formUtil.getSelectedItem('airline');
    var orderIDValue = this.formUtil.getTextAreaValue('orderID');
    console.log("sendForm: " + orderIDValue + "," + airlineValue);
    store.dispatch({ type: SUBMIT, orderID: orderIDValue, airline: airlineValue });
  }

  preload ()
  {
      this.load.image('sky1', '/assets/sky1.jpg');
      this.load.image('sky2', '/assets/sky2.jpg');
      this.load.image('sky3', '/assets/sky3.jpg');
  }  

  onEvent ()
  {
    var i = Math.floor(Math.random() * 3) + 1;
    this.image1.visible = (i == 1);
    this.image2.visible = (i == 2);
    this.image3.visible = (i == 3);
  }


}

