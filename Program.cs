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
            if(args.Length > 0 && args[0].ToLower() == "search")
            {
                // execute search command
                Console.WriteLine("Executing Search...");
                HandleSearchCommand(args);
            }
            else CreateWebHostBuilder(args).Build().Run();
        }

        public static IWebHostBuilder CreateWebHostBuilder(string[] args) =>
            WebHost.CreateDefaultBuilder(args)
                .UseStartup<Startup>();
        

        public static void HandleSearchCommand(string[] args)
        {
            ICameraProvider provider = new CsvCameraProvider("data/cameras-defb.csv");
            string name = ExtractNameFlag(args);
            IEnumerable<CameraModel> cams = provider.FilterByName(name).ToList();
            foreach(CameraModel cam in cams)
            {
                string camStringLine = FormatCamToString(cam);
                Console.WriteLine(camStringLine);
            }
        }

        public static string FormatCamToString(CameraModel cam)
        {
            return cam.Index + " | " + cam.Name + " | " + cam.Latitude + " | " + cam.Longitude;
        }

        public static string ExtractNameFlag(string[] args)
        {
            int counter = 0;
            foreach(string arg in args)
            {
                bool isNameFlag = (arg == "--name" || arg == "-n");
                bool hasNameValue = args.Length > counter + 1;
                if(isNameFlag && hasNameValue) return args[counter + 1];
                counter++;
            }
            return string.Empty;
        }
    }
}
