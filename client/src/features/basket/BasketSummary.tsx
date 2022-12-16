import {
  TableContainer,
  Paper,
  Table,
  TableBody,
  TableRow,
  TableCell,
} from "@mui/material";
import { useStoreContext } from "../../context/StoreContext";
export default function BasketSummary() {
  const { basket } = useStoreContext();
  let subtotal = 0;

  const items = [...basket?.items!];
  subtotal = items.reduce(
    (accumulator, currentValue) =>
      accumulator + (currentValue.price / 100) * currentValue.quantity,
    0
  );

  const deliveryFee = subtotal === 0 || subtotal >= 100 ? 0 : 10;

  return (
    <>
      <TableContainer
        component={Paper}
        variant={"outlined"}
        sx={{ marginTop: 1 }}
      >
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
                <span style={{ fontStyle: "italic" }}>
                  *Orders over $100 qualify for free delivery
                </span>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
}
