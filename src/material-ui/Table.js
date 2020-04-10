import React from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TablePagination from "@material-ui/core/TablePagination";
import TableRow from "@material-ui/core/TableRow";
import TableSortLabel from "@material-ui/core/TableSortLabel";
import Paper from "@material-ui/core/Paper";
import NumberFormat from 'react-number-format';

var rows = [];
var pageNum = 0;

// Table sorting 
function descendingComparator(a, b, orderBy) {
    if (b[orderBy] < a[orderBy]) {
        return -1;
    }
    if (b[orderBy] > a[orderBy]) {
        return 1;
    }
    return 0;
}

function getComparator(order, orderBy) {
    return order === "desc"
        ? (a, b) => descendingComparator(a, b, orderBy)
        : (a, b) => -descendingComparator(a, b, orderBy);
}

function stableSort(array, comparator) {
    const stabilizedThis = array.map((el, index) => [el, index]);
    stabilizedThis.sort((a, b) => {
        const order = comparator(a[0], b[0]);
        if (order !== 0) return order;
        return a[1] - b[1];
    });
    return stabilizedThis.map(el => el[0]);
}

// Header info
const headCells = [
    { id: "name", numeric: false, disablePadding: false, label: "Name" },
    { id: "cases", numeric: true, disablePadding: false, label: "Cases" },
    { id: "cases24hours", numeric: true, disablePadding: false, label: "Δ 24 hours" },
    { id: "deaths", numeric: true, disablePadding: false, label: "Deaths" },
    { id: "deaths24hours", numeric: true, disablePadding: false, label: "Δ 24 hours" },
    { id: "cfr", numeric: true, disablePadding: false, label: "CFR, %" },
    // { id: "perCapita", numeric: true, disablePadding: false, label: "Per 10k" }
];

function EnhancedTableHead(props) {
    const {
        classes,
        order,
        orderBy,
        onRequestSort
    } = props;
    const createSortHandler = property => event => {
        onRequestSort(event, property);
    };

    return (
        <TableHead>
            <TableRow>
                <TableCell />
                {headCells.map(headCell => (
                    <TableCell
                        key={headCell.id}
                        padding={headCell.disablePadding ? "none" : "default"}
                        sortDirection={orderBy === headCell.id ? order : false}
                    >
                        <TableSortLabel
                            active={orderBy === headCell.id}
                            direction={orderBy === headCell.id ? order : "asc"}
                            onClick={createSortHandler(headCell.id)}
                        >
                            {headCell.label}
                            {orderBy === headCell.id ? (
                                <span className={classes.visuallyHidden}>
                                    {order === "desc" ? "sorted descending" : "sorted ascending"}
                                </span>
                            ) : null}
                        </TableSortLabel>
                    </TableCell>
                ))}
            </TableRow>
        </TableHead>
    );
}

EnhancedTableHead.propTypes = {
    classes: PropTypes.object.isRequired,
    numSelected: PropTypes.number.isRequired,
    onRequestSort: PropTypes.func.isRequired,
    order: PropTypes.oneOf(["asc", "desc"]).isRequired,
    orderBy: PropTypes.string.isRequired,
    rowCount: PropTypes.number.isRequired
};

const useStyles = makeStyles(theme => ({
    root: {
        width: "100%"
    },
    paper: {
        width: "100%",
        marginBottom: theme.spacing(2)
    },
    table: {
        minWidth: 500,
        backgroundColor: "rgb(175, 175, 175)",
        borderColor: 'rgb(175, 175, 175)',
    },
    visuallyHidden: {
        border: 0,
        clip: "rect(0 0 0 0)",
        height: 1,
        margin: -1,
        overflow: "hidden",
        padding: 0,
        position: "absolute",
        top: 20,
        width: 1
    }
}));




export default function EnhancedTable(props) {

    rows = props.tableData;
    rows = rows.sort((a, b) => b.cases - a.cases);

    const classes = useStyles();
    const [order, setOrder] = React.useState("asc");
    const [orderBy, setOrderBy] = React.useState("calories");
    const [selected] = React.useState([]);
    const [page, setPage] = React.useState(0);
    const [dense] = React.useState(false);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);

    const handleRequestSort = (event, property) => {
        const isAsc = orderBy === property && order === "asc";
        setOrder(isAsc ? "desc" : "asc");
        setOrderBy(property);
    };

    const handleClick = (event, name) => {
        // row click callback
    };

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = event => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    const emptyRows = rowsPerPage - Math.min(rowsPerPage, rows.length - page * rowsPerPage);

    return (
        <div className={classes.root}>
            <Paper className={classes.paper}>
                <TableContainer>
                    <Table
                        className={classes.table}
                        size={dense ? "small" : "medium"}
                    >
                        <EnhancedTableHead
                            classes={classes}
                            numSelected={selected.length}
                            order={order}
                            orderBy={orderBy}
                            onRequestSort={handleRequestSort}
                            rowCount={rows.length}
                        />
                        <TableBody>
                            {stableSort(rows, getComparator(order, orderBy))
                                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                .map((row) => {
                                    return (
                                        <TableRow
                                            hover
                                            onClick={event => handleClick(event, row.name)}
                                            tabIndex={-1}
                                            key={row.name}
                                        >
                                            <TableCell />
                                            <TableCell>
                                                {row.name}
                                            </TableCell>

                                            <TableCell>
                                                <NumberFormat value={row.cases} thousandSeparator={true} displayType={'text'}></NumberFormat>
                                            </TableCell>
                                            <TableCell>
                                                <NumberFormat value={row.cases24hours} thousandSeparator={true} displayType={'text'}></NumberFormat>
                                            </TableCell>

                                            <TableCell>
                                                <NumberFormat value={row.deaths} thousandSeparator={true} displayType={'text'}></NumberFormat>
                                            </TableCell>
                                            <TableCell>
                                                <NumberFormat value={row.deaths24hours} thousandSeparator={true} displayType={'text'}></NumberFormat>
                                            </TableCell>

                                            <TableCell>
                                                <NumberFormat value={row.cfr} thousandSeparator={true} displayType={'text'}></NumberFormat>
                                            </TableCell>
                                            {/* <TableCell>
                                              <NumberFormat value={row.perCapita} thousandSeparator={true} displayType={'text'}></NumberFormat>
                                            </TableCell> */}
                                        </TableRow>
                                    );
                                })}
                            {emptyRows > 0 && (
                                <TableRow style={{ height: (dense ? 33 : 53) * emptyRows }}>
                                    <TableCell colSpan={6} />
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                </TableContainer>
                <TablePagination
                    rowsPerPageOptions={[5, 10, 25, 50]}
                    component="div"
                    count={rows.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onChangePage={handleChangePage}
                    onChangeRowsPerPage={handleChangeRowsPerPage}
                />
            </Paper>
        </div>
    );
}
