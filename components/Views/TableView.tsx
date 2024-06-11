import { Card, Grid } from "@mui/material";
import { DataGrid, GridColDef, GridRowIdGetter, GridToolbar } from "@mui/x-data-grid";
import { useRouter } from "next/router";
interface TableViewProps{
  columns:GridColDef[];
  rows:any;
//   ID: GridRowIdGetter;
  ID: string;
  url?:string;
  style?:Object;
  height?:string;
  loading?:boolean;
}

const TableView: React.FC<TableViewProps> = ({columns,rows,ID,url,style,height,loading}) => {
  const router=useRouter();
  return (
    <>
      <Grid sx={{ mt: 2 }}>
        <Card sx={{ height: {md: height ? height : "75vh",xs:"30vh"}, borderRadius: "20px",boxShadow:(theme)=>theme.shadow.boxShadow}}>
          <DataGrid
             sx={{
              '.MuiDataGrid-toolbarContainer': {
                  pb: 1
              },
              '.MuiDataGrid-columnHeaderTitleContainer': {
                  fontWeight: 800
              },
              '.MuiDataGrid-columnHeader': {
                  background: (theme)=>theme.palette.primary.main,
                  color: '#fff'
              },
              '.MuiDataGrid-footerContainer': {
                  display: 'none'
              },
              borderRadius: '12px',
              ...style
          }}
            className="tableview"
            disableSelectionOnClick
            columns={columns}
            getRowId={(row) => row[ID]}
            rows={rows}
            // onRowClick={(params)=>router.push(`${url}/${params.id}`)}
            disableDensitySelector
            // slots={{
            //   toolbar: GridToolbar,
            // }}
            loading={loading || false}
            disableColumnMenu
            disableColumnSelector
          />
        </Card>
      </Grid>
    </>
  );
};

export default TableView;
