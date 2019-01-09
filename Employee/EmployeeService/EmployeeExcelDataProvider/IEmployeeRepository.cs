using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace EmployeeExcelDataProvider
{
    public interface IEmployeeRepository<T1, T2> where T1 :class
    {
         List<T1> GetAll();
        T1 GetByPriaryKey(T2 primaryKey );
        bool Insert(T1 obj);

        bool Update(T1 obj);
        bool Delete(T2 primaryKey);

    }
}
