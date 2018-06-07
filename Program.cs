using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Logging;
using CameraLogic;

namespace CameraApi
{
    public class Program
    {
        public static void Main(string[] args)
        {
            var provider = new CsvCameraProvider("data/cameras-defb.csv");
            CommandLineHandler handler = new CommandLineHandler(provider);

            if(handler.IsCommand(args)) handler.HandleCommand(args);
            else CreateWebHostBuilder(args).Build().Run();
        }

        public static IWebHostBuilder CreateWebHostBuilder(string[] args) =>
            WebHost.CreateDefaultBuilder(args)
                .UseStartup<Startup>();
    }
}
