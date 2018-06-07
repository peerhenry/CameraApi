using System.Linq;

namespace CameraLogic
{
  public interface ICameraProvider
  {
    IQueryable<CameraModel> GetCameras();

    IQueryable<CameraModel> FilterByName(string name);
  }
}