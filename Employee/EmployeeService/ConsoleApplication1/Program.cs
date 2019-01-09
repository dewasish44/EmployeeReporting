using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using EmployeeEnitites;
using EmployeeExcelDataProvider;

namespace ConsoleApplication1
{
    class Program
    {
        static void Main(string[] args)
        {
            int id = 4;
            EmployeeEntity obj = new EmployeeEntity()
            {
                Id = id,
                EmployeeId = "A01" + id,
                FirstName = "Abc11" + id,
                LastName = "CD11E" + id,
                Salary = 1000*id

            };

            IEmployeeRepository<EmployeeEntity, int> provider = new EmployeeDAL();
            provider.Update(obj);
            //provider.Delete(3);
        }
    }
}
