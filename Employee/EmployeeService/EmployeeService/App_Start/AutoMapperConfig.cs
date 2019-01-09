using EmployeeService.Models;
using EmployeeEnitites;


namespace EmployeeService
{
    public class AutoMapperConfig
    {
        public static void Initialize()
        {
           AutoMapper.Mapper.Initialize((config) =>
            {
                config.CreateMap < Employee, EmployeeEntity > ().ReverseMap();
            });
        }
    }
}