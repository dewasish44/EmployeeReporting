using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using EmployeeService.Models;
using EmployeeEnitites;
using EmployeeExcelDataProvider;


namespace EmployeeService.Controllers
{
    public class EmployeeController : ApiController
    {
        //List<EmployeeEntity> _employeeEntity;


        // GET: api/Employee
        
        public IHttpActionResult  Get()
        {

            IEmployeeRepository<EmployeeEntity, int> provider = new EmployeeDAL();
             var result = provider.GetAll();
            if (result.Count == 0)
            {
                return NotFound();
            }

            return Ok(result);
        }
        
        // GET: api/Employee/5
        public IHttpActionResult Get(int id)
        {
            IEmployeeRepository<EmployeeEntity, int> provider = new EmployeeDAL();
            var result = provider.GetByPriaryKey(id);

            if (result == null)
            {
                return NotFound();
            }

            return Ok(result);
        }

        // POST: api/Employee
        public HttpResponseMessage PostEmployee(Employee item)
        {
            var obj = new EmployeeEntity() { Id = item.Id, EmployeeId = item.EmployeeId, FirstName = item.FirstName, LastName = item.LastName, Salary = item.Salary };
            IEmployeeRepository<EmployeeEntity, int> provider = new EmployeeDAL();
            var result =provider.Insert(obj);            

            var response = Request.CreateResponse<Employee>(HttpStatusCode.Created, item);

            return response;
        }
        // PUT: api/Employee/5
        public IHttpActionResult Put(Employee item)
        {
            var obj = new EmployeeEntity() { Id = item.Id, EmployeeId = item.EmployeeId, FirstName = item.FirstName, LastName = item.LastName, Salary = item.Salary };
            IEmployeeRepository<EmployeeEntity, int> provider = new EmployeeDAL();
            var result = provider.Update(obj);

            return Ok();
        }

        // DELETE: api/Employee/5
        public IHttpActionResult Delete(int id)
        {
            IEmployeeRepository<EmployeeEntity, int> provider = new EmployeeDAL();
            var result = provider.Delete(id);

            return Ok();
        }
    }
}
