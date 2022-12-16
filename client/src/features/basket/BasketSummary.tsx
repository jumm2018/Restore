import { TableContainer, Paper, Table, TableBody, TableRow, TableCell, Typography } from "@mui/material";
import { Basket } from "../../app/models/basket";
import { useStoreContext } from "../../context/StoreContext";
export default function BasketSummary() {
    const { basket } = useStoreContext();
    const subtotal = 0;
    const deliveryFee = 0;
    const CalculateTotal = (baskets: Basket)=>{
     const initTotal =  [...basket?.items!] 
     console.log(initTotal.map(item=>{
        

     }))
    }
    
    CalculateTotal(basket!);
    return (
        <>
            <TableContainer component={Paper} variant={'outlined'} sx={{marginTop:1}}>
                <Table>
                    <TableBody>
                        <TableRow>
                            <TableCell colSpan={2}>Subtotal</TableCell>
                            <TableCell align="right">{subtotal}</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell colSpan={2}>Delivery fee*</TableCell>
                            <TableCell align="right">{deliveryFee}</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell colSpan={2}>Total</TableCell>
                            <TableCell align="right">{subtotal + deliveryFee}</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell>
                                <span style={{fontStyle: 'italic'}}>*Orders over $100 qualify for free delivery</span>
                            </TableCell>
                        </TableRow>
                    </TableBody>
                </Table>
            </TableContainer>
        </>
    )
}