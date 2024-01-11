package view;


import javax.swing.*;
import java.awt.*;

public class PaginaSenzor  extends JFrame{
    JTextArea textArea;
    public PaginaSenzor() {
        this.setDefaultCloseOperation(JFrame.DO_NOTHING_ON_CLOSE);
        this.setBounds(100, 100, 781, 557);
        this.getContentPane().setLayout(null);
        this.getContentPane().setBackground(new Color(0xFFDFCB));

        textArea = new JTextArea(10, 30);
        textArea.setLineWrap(true);
        textArea.setWrapStyleWord(true);
        textArea.setBackground(new Color(0xFFDFCB));


        JScrollPane scrollPane = new JScrollPane(textArea);
        scrollPane.setVerticalScrollBarPolicy(JScrollPane.VERTICAL_SCROLLBAR_ALWAYS);

        textArea.append("Rezultate simulare:\n");

        textArea.setCaretPosition(textArea.getDocument().getLength());

        this.setLayout(new BorderLayout());
        this.add(scrollPane, BorderLayout.CENTER);
    }
    public  void deschideFereastra(){
        this.setVisible(true);
    }
    public  void inchideFereastra(){
        this.setVisible(false);
    }
    public void setTextInTextArea(String text) {
        textArea.setText(text);
    }

    public String getTextInTextArea() {
        return textArea.getText();
    }

    public int showMessage(String message, int stop) {
        if(stop ==1 || stop==0) {
            JOptionPane.showMessageDialog(this, message);
        }
        return -1;

    }
}
