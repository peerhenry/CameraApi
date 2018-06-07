using System;
using System.IO;
using System.Collections.Generic;
using System.Linq;

namespace CameraLogic
{
  public class CsvCameraProvider : ICameraProvider
  {
    private IQueryable<CameraModel> camCollection;

    public CsvCameraProvider(string path)
    {
      this.camCollection = ReadFileToCollection(path);
    }

    private IQueryable<CameraModel> ReadFileToCollection(string path)
    {
      List<CameraModel> camList = new List<CameraModel>();
      using(var reader = new StreamReader(path))
      {
        string line;
        int counter = 0;
        while( (line = reader.ReadLine()) != null )
        {
          bool lineIsReadable = counter > 0 && !string.IsNullOrWhiteSpace(line);
          if(lineIsReadable)
          {
            CameraModel newModel = LineToModel(line, counter);
            camList.Add( newModel );
          }
          counter++;
        }
      }
      return camList.AsQueryable();
    }

    private CameraModel LineToModel(string line, int counter)
    {
      string[] splits = line.Split(';');
      string name = splits[0];
      int index = 0;
      double latitude = 0;
      double longitude = 0;
      string error = null;

      try{
        index = extractIndex(line);
        latitude = Convert.ToDouble(splits[1]);
        longitude = Convert.ToDouble(splits[2]);
      }
      catch(Exception ex)
      {
        error = ExceptionToErrorMessage(ex, counter + 1);
      }
      
      return new CameraModel{ 
        Index = index,
        Name = name,
        Latitude = latitude,
        Longitude = longitude,
        Error = error
      };
    }

    private int extractIndex(string line)
    {
      // UTR-CM-568
      string[] splits = line.Split('-', ' ');
      return Convert.ToInt32(splits[2]);
    }

    private string ExceptionToErrorMessage(Exception ex, int lineNumber)
    {
      if(ex is FormatException || ex is OverflowException)
      {
        return string.Format("CSV line {0} invalid format of longitude or latitude", lineNumber);
      }
      else if(ex is IndexOutOfRangeException)
      {
        return string.Format("CSV line {0} does not match expected format; should contain 3 entries separated by ';'.", lineNumber);
      }
      return string.Format("CSV line {0} gave an exception: " + ex.Message, lineNumber);
    }

    public IQueryable<CameraModel> GetCameras()
    {
      return this.camCollection;
    }

    public IQueryable<CameraModel> FilterByName(string name)
    {
      string lowerName = name.ToLower();
      var result = 
        from cam in camCollection 
        where cam.Name.ToLower().Contains(lowerName)
        select cam;
      return result;
    }
  }
}