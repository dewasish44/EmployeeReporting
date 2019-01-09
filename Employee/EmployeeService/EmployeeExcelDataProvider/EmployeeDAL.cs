using EmployeeEnitites;
using EmployeeExcelDataProvider;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Data.OleDb;
using System.Data;

namespace EmployeeExcelDataProvider
{
    public class EmployeeDAL : IEmployeeRepository<EmployeeEntity, int>
    {

        const string path = @"F:\Employee\EmployeeService\EmployeeExcelDataProvider\Employee.xlsx";
        const string ConStr = "Provider=Microsoft.ACE.OLEDB.12.0;Data Source=" + path + ";Extended Properties=\"Excel 12.0;HDR=Yes;\"";
        public List<EmployeeEntity> GetAll()
        {
            List<EmployeeEntity> emps = new List<EmployeeEntity>();
            string query = "SELECT * FROM [Sheet1$] where Id > 0";
            OleDbConnection conn = new OleDbConnection(ConStr);

            if (conn.State == ConnectionState.Closed)
            {
                conn.Open();
            }

            OleDbCommand cmd = new OleDbCommand(query, conn);
            OleDbDataAdapter da = new OleDbDataAdapter(cmd);
            DataSet ds = new DataSet();
            da.Fill(ds);

            var listObject = ds.Tables[0].AsEnumerable()
                                  .Select(x => new EmployeeEntity()
                                  {
                                      Id = Convert.ToInt32( x.Field<double>("Id")),
                                      EmployeeId = x.Field<string>("EmployeeId"),
                                      FirstName = x.Field<string>("FirstName"),
                                      LastName = x.Field<string>("LastName"),
                                      Salary = Convert.ToDecimal(x.Field<double>("Salary"))
                                  }).ToList();


            conn.Close();

            return listObject;
        }


        public EmployeeEntity GetByPriaryKey(int primaryKey)
        {
            List<EmployeeEntity> emps = new List<EmployeeEntity>();
            string query = "SELECT * FROM [Sheet1$] where Id="+ Convert.ToDouble(primaryKey);
            OleDbConnection conn = new OleDbConnection(ConStr);

            if (conn.State == ConnectionState.Closed)
            {
                conn.Open();
            }

            OleDbCommand cmd = new OleDbCommand(query, conn);
            OleDbDataAdapter da = new OleDbDataAdapter(cmd);
            DataSet ds = new DataSet();
            da.Fill(ds);

            var listObject = ds.Tables[0].AsEnumerable()
                                  .Select(x => new EmployeeEntity()
                                  {
                                      Id = Convert.ToInt32(x.Field<double>("Id")),
                                      EmployeeId = x.Field<string>("EmployeeId"),
                                      FirstName = x.Field<string>("FirstName"),
                                      LastName = x.Field<string>("LastName"),
                                      Salary = Convert.ToDecimal(x.Field<double>("Salary"))
                                  }).ToList();


            conn.Close();

            return listObject.FirstOrDefault();
        }

        public bool Insert(EmployeeEntity obj)
        {
            int id = GetAll().Select(o => o.Id).Max() + 1;
            string query = "INSERT INTO [Sheet1$] ([Id], [EmployeeId], [FirstName], [LastName], [Salary]) VALUES(" 
                + Convert.ToDouble(id) + ",'" + obj.EmployeeId + "','" + obj.FirstName + "','" 
                + obj.LastName + "'," + Convert.ToDouble( obj.Salary) + ")";
            //Providing connection    
            OleDbConnection conn = new OleDbConnection(ConStr);
            //checking that connection state is closed or not if closed the     
            //open the connection    
            if (conn.State == ConnectionState.Closed)
            {
                conn.Open();
            }
            //create command object    
            OleDbCommand cmd = new OleDbCommand(query, conn);
            int result = cmd.ExecuteNonQuery();

            conn.Close();
            return true;
        }



        public bool Update(EmployeeEntity obj)
        {
            string query = "UPDATE  [Sheet1$] set [EmployeeId]= '" + obj.EmployeeId +
                "',[FirstName] = '"+ obj.FirstName +
                "', [LastName] ='"+ obj.LastName +
                "', [Salary] =" +  Convert.ToDouble(obj.Salary)  + 
                " Where Id=" + Convert.ToDouble(obj.Id);
            //Providing connection    
            OleDbConnection conn = new OleDbConnection(ConStr);
            //checking that connection state is closed or not if closed the     
            //open the connection    
            if (conn.State == ConnectionState.Closed)
            {
                conn.Open();
            }
            //create command object    
            OleDbCommand cmd = new OleDbCommand(query, conn);
            int result = cmd.ExecuteNonQuery();

            conn.Close();
            return true;
        }

        public bool Delete(int primaryKey)
        {
            string query = "UPDATE  [Sheet1$] set [EmployeeId]= '" +"" +
                  "',[FirstName] = '" + "" +
                  "', [LastName] ='" + "" +
                  "', [Salary] =" + Convert.ToDouble(0) +
                  ", [Id] =" + Convert.ToDouble(0) +
                  " Where Id=" + Convert.ToDouble(primaryKey);
            //Providing connection    
            OleDbConnection conn = new OleDbConnection(ConStr);
            //checking that connection state is closed or not if closed the     
            //open the connection    
            if (conn.State == ConnectionState.Closed)
            {
                conn.Open();
            }
            //create command object    
            OleDbCommand cmd = new OleDbCommand(query, conn);
            int result = cmd.ExecuteNonQuery();

            conn.Close();
            return true;
        }

     
    }
}
