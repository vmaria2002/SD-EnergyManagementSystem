package controller;



import sensor.ReadSensor;
import view.PaginaMeasurement;
import view.PaginaSenzor;

import java.awt.event.ActionEvent;
import java.awt.event.ActionListener;
import java.util.Timer;

public class MeasurementController{
    private Long id;
    private PaginaMeasurement paginaMeasurement;
    private PaginaStartController paginaStartController;
    private PaginaSenzor paginaSenzor;
    private PaginaSenzor paginaCitit;
    private Long maxConsumption;
    public MeasurementController( PaginaMeasurement paginaMeasurement, PaginaStartController paginaStartController, PaginaSenzor paginaSenzor, PaginaSenzor paginaCitit) {
        this.paginaStartController = paginaStartController;
        this.paginaMeasurement = paginaMeasurement;
        this.paginaSenzor = paginaSenzor;
        this.paginaCitit = paginaCitit;
        this.paginaMeasurement.showConsoleListenner(new MeasurementInnerClass());
    }

    boolean nu = true;
    class MeasurementInnerClass implements ActionListener {
        @Override
        public void actionPerformed(ActionEvent e) {
            try {
                int idDevice =paginaMeasurement.getidDevicetextField();
                int time = paginaMeasurement.getiTimetextField();
                System.out.println(idDevice);
                System.out.println(time);

                if(idDevice==0){
                    paginaMeasurement.showMessage("Id invalid! Se accepta doar numere");
                    //System.exit(1);
                } else{
                    //Calculez si verific daca s-a consumat.

                    ReadSensor readSensor = new ReadSensor(maxConsumption,idDevice, paginaSenzor, paginaCitit);
                    Timer timer = new Timer();
                    timer.schedule( readSensor, 0, time);
                    paginaSenzor.deschideFereastra();
                    paginaCitit.deschideFereastra();
                }
            } catch (Exception ex) {
                System.out.println(ex);
                paginaMeasurement.showMessage("Datele introduse  sunt invalide");
                //System.exit(1);
            }
        }
    }
}


