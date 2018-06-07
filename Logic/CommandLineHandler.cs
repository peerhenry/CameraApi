using System;
using System.IO;
using System.Collections.Generic;
using System.Linq;

namespace CameraLogic
{
  public class CommandLineHandler
  {
    private ICameraProvider provider;

    public CommandLineHandler(ICameraProvider provider)
    {
      this.provider = provider;
    }

    public bool IsCommand(string[] args)
    {
      return (args.Length > 0 && args[0].ToLower() == "search");
    }

    public void HandleCommand(string[] args)
    {
        HandleSearchCommand(args);
    }

    public void HandleSearchCommand(string[] args)
    {
      string name = ExtractNameFlag(args);
      IEnumerable<CameraModel> cams = provider.FilterByName(name).ToList();
      foreach(CameraModel cam in cams)
      {
          string camStringLine = FormatCamToString(cam);
          Console.WriteLine(camStringLine);
      }
    }

    public string FormatCamToString(CameraModel cam)
    {
        return cam.Index + " | " + cam.Name + " | " + cam.Latitude + " | " + cam.Longitude;
    }

    public string ExtractNameFlag(string[] args)
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