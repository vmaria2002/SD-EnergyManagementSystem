package view;
import javax.swing.*;
import java.awt.*;
import java.awt.event.ActionListener;
import java.awt.event.WindowAdapter;
import java.awt.event.WindowEvent;

public class PaginaStart extends JFrame {
    public  JButton btnStart;

    public PaginaStart(){
        this.setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE);

        this.setBounds(100, 100, 781, 557);
        this.getContentPane().setLayout(null);
        this.getContentPane().setBackground(new Color(0xFFDFCB));

        JLabel lblNewLabel = new JLabel("EMS: Sensor Simulator");
        lblNewLabel.setFont(new Font("Tahoma", Font.PLAIN, 21));
        lblNewLabel.setBounds(228, 2, 362, 22);
        this.getContentPane().add(lblNewLabel);

        JLabel lblNewLabel_2 = new JLabel("");
        lblNewLabel_2.setIcon(new ImageIcon("D:\\An4_sem1\\SD\\assignment-1-vmaria2002\\assignment-1-vmaria2002\\sensor_simulator\\start.png"));
        lblNewLabel_2.setBounds(144, 30, 660, 340);
        this.getContentPane().add(lblNewLabel_2);

        btnStart = new JButton("Start Simulation");
        btnStart.setFont(new Font("Tahoma", Font.PLAIN, 16));
        btnStart.setBounds(288, 388, 227, 34);
        btnStart.setBackground(new Color(0xF69658));
        this.getContentPane().add(btnStart);



    }
    public  void deschideFereastra(){
        this.setVisible(true);
    }
    public  void inchideFereastra(){
        this.setVisible(false);
    }

    public void startListenner( ActionListener action){

        btnStart.addActionListener(action);
    }

}
