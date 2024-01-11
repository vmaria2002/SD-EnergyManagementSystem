package view;


import javax.swing.*;
import java.awt.*;
import java.awt.event.ActionListener;
import java.awt.event.WindowAdapter;
import java.awt.event.WindowEvent;

public class PaginaMeasurement extends JFrame {
    private JTextField idDevicetextField;
    private JTextField idTimetextField;
    private  JButton startButton;
    private  JButton stopButton;
    public PaginaMeasurement(){

        this.setBounds(100, 100, 781, 557);
        this.getContentPane().setLayout(null);
        this.getContentPane().setBackground(new Color(0xFFDFCB));

        JLabel lblNewLabel = new JLabel("Introduceti ID-ul device-ului:");
        lblNewLabel.setFont(new Font("Tahoma", Font.PLAIN, 18));
        lblNewLabel.setBounds(164, 35, 389, 42);
        this.getContentPane().add(lblNewLabel);

        JLabel lblNewLabel_1 = new JLabel("Device ID:");
        lblNewLabel_1.setFont(new Font("Tahoma", Font.PLAIN, 15));
        lblNewLabel_1.setBounds(47, 123, 137, 36);
        this.getContentPane().add(lblNewLabel_1);

        idDevicetextField = new JTextField();
        idDevicetextField.setBounds(153, 126, 225, 27);
        this.getContentPane().add(idDevicetextField);
        idDevicetextField.setColumns(10);



        JLabel lblNewLabel_2 = new JLabel("Timp citire[ms]:");
        lblNewLabel_2.setFont(new Font("Tahoma", Font.PLAIN, 15));
        lblNewLabel_2.setBounds(47, 223, 137, 36);
        this.getContentPane().add(lblNewLabel_2);

        idTimetextField = new JTextField();
        idTimetextField.setBounds(153, 226, 225, 27);
        this.getContentPane().add(idTimetextField);
        idTimetextField.setColumns(10);

        startButton = new JButton("READ");
        startButton.setBackground(new Color(0xF69658));
        startButton.setFont(new Font("Tahoma", Font.PLAIN, 18));
        startButton.setBounds(185, 357, 130, 27);
        this.getContentPane().add(startButton);
    }
    public  void deschideFereastra(){
        this.setVisible(true);
    }
    public  void inchideFereastra(){
        this.setVisible(false);
    }

    public void showConsoleListenner( ActionListener action){
        startButton.addActionListener(action);
    }
    public void closeConsoleListenner( ActionListener action){
        stopButton.addActionListener(action);
    }
    public  void showMessage(String message){
        JOptionPane.showMessageDialog(this, message);
        refresh();
    }
    //seteaza tot pe null, goleste casutele

    public void refresh(){
        idDevicetextField.setText(null);
    }
    /**
     * Din UI: se preia valoarea de tip String
     *  se face conversia la int sa se verifice ca e int, altfel eroare!
     */
    public int getidDevicetextField() {
        String text = idDevicetextField.getText();
        try {
            int intValue = Integer.parseInt(text);
            return intValue;
        } catch (NumberFormatException e) {
            /**
             Gestioneaza cazul in care textul nu poate fi parsat ca int
             Se prinde aceasta eroare==> nu se vor permite date introduse gresit
            */

            return 0;
        }
    }
    public int getiTimetextField() {
        String text = idTimetextField.getText();
        try {
            int intValue = Integer.parseInt(text);
            return intValue;
        } catch (NumberFormatException e) {
            /**
             Gestioneaza cazul in care textul nu poate fi parsat ca int
             Se prinde aceasta eroare==> nu se vor permite date introduse gresit
             */
            return 0;
        }
    }


}
