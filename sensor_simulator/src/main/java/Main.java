
import controller.MeasurementController;
import controller.PaginaStartController;
import view.*;

public class Main {
    public static void main(String[] args) {

        PaginaStart paginaStart = new PaginaStart();
        PaginaMeasurement paginaMeasurement = new PaginaMeasurement();
        PaginaSenzor paginaSenzor = new PaginaSenzor();
        PaginaSenzor paginaCitit= new PaginaSenzor();

        PaginaStartController paginaStartController = new PaginaStartController(paginaStart, paginaMeasurement);
        MeasurementController measurementController = new MeasurementController(paginaMeasurement, paginaStartController, paginaSenzor, paginaCitit);

    }
}

