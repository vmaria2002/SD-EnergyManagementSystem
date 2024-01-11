package controller;

import view.PaginaMeasurement;
import view.PaginaStart;
import java.awt.event.ActionEvent;
import java.awt.event.ActionListener;

public class PaginaStartController {
    private PaginaStart paginaStart;
    private String butonApasat;
    private PaginaMeasurement paginaMeasurement;
    public PaginaStartController(PaginaStart paginaStart, PaginaMeasurement paginaMeasurement){
        this.paginaStart=paginaStart;
        this.paginaMeasurement = paginaMeasurement;
        this.paginaStart.deschideFereastra();
        this.butonApasat="";
        this.paginaStart.startListenner(new StartInnerClass());
    }


    class StartInnerClass implements ActionListener {
        @Override
        public void actionPerformed(ActionEvent e) {
            try {
                paginaMeasurement.deschideFereastra();
                butonApasat="start";
            } catch (Exception ex) {

            }
        }
    }


}

