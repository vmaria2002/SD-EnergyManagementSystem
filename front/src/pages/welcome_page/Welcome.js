/*
Sursa: https://github.com/mui/material-ui/blob/v5.14.14/docs/data/material/getting-started/templates/album/Album.js
 */

import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import CssBaseline from '@mui/material/CssBaseline';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import {Link, useNavigate} from "react-router-dom";
import { createTheme, ThemeProvider } from '@mui/material/styles';
import {useEffect} from "react";
import {useCookies} from "react-cookie";

const defaultTheme = createTheme();

export default function Welcome() {
    let navigate = useNavigate()
    const [cookies, setCookie] = useCookies("");
    useEffect(() => {
        setCookie("status_autentificare", "false" )
        setCookie("userRole", 0 )
        setCookie("userID", 0)
    });
    return (
        <ThemeProvider theme={defaultTheme}>
            <CssBaseline />
            <AppBar position="absolut">
            </AppBar>
            <main>
                <Box
                    sx={{
                        bgcolor: 'background.paper',
                        pt: 8,
                        pb: 6,
                    }}
                >
                    <Container maxWidth="sm">
                        <Typography
                            component="h1"
                            variant="h2"
                            align="center"
                            color="text.primary"
                            gutterBottom
                        >
                            Energy Management System
                        </Typography>
                        <Typography variant="h5" align="center" color="text.secondary" paragraph>
                           Aplicatia ta de monitotizare a consumului dispozitivelor detinute in orice locatie
                        </Typography>
                        <Stack
                            sx={{ pt: 4 }}
                            direction="row"
                            spacing={2}
                            justifyContent="center"
                        >

                            <Link to="/register">
                                <Button variant="contained">Register</Button>
                            </Link>

                            <Link to="/login">
                                <Button variant="outlined">Login</Button>
                            </Link>


                        </Stack>
                    </Container>
                </Box>
                <Container sx={{ py: 4 }} maxWidth="md">
                    {/* End hero unit */}
                    <Grid container spacing={4}>

                            <Grid item key={1} xs={10} sm={6} md={4}>
                                <Card
                                    sx={{ height: '80%', display: 'flex', flexDirection: 'column' }}
                                >
                                    <CardMedia
                                        component="div"
                                        sx={{
                                            // 16:9
                                            pt: '56.25%',
                                        }}
                                        image="data:image/jpeg;base64,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"
                                    />
                                    <CardContent sx={{ flexGrow: 1 }}>
                                        <Typography gutterBottom variant="h5" component="h2">
                                            Devices
                                        </Typography>

                                    </CardContent>
                                </Card>
                            </Grid>
                        <Grid item key={2} xs={10} sm={6} md={4}>
                            <Card
                                sx={{ height: '80%', display: 'flex', flexDirection: 'column' }}
                            >
                                <CardMedia
                                    component="div"
                                    sx={{
                                        // 16:9
                                        pt: '56.25%',
                                    }}
                                    image="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQF9np7dRz4wMeDuSBx62oKkk5-KWaYsHVsfkSsoJ6lK5QPhZdPWEFv1Yw0Oib5eyyD9mw&usqp=CAU"

                                   />
                                <CardContent sx={{ flexGrow: 1 }}>
                                    <Typography gutterBottom variant="h5" component="h2">
                                        Users
                                    </Typography>

                                </CardContent>
                            </Card>
                        </Grid>
                        <Grid item key={3} xs={10} sm={6} md={4}>
                            <Card
                                sx={{ height: '80%', display: 'flex', flexDirection: 'column' }}
                            >
                                <CardMedia
                                    component="div"
                                    sx={{
                                        // 16:9
                                        pt: '70.25%',
                                    }}
                                    image="https://t4.ftcdn.net/jpg/01/65/92/65/360_F_165926537_Lsyqyt89VYx1hH1a2hwqMDlFpVgyxas9.jpg"

                                />
                                <CardContent sx={{ flexGrow: 1 }}>
                                    <Typography gutterBottom variant="h5" component="h2">
                                        Admin
                                    </Typography>

                                </CardContent>
                            </Card>
                        </Grid>

                    </Grid>
                </Container>
            </main>

        </ThemeProvider>
    );
}