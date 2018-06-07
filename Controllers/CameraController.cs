using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using CameraLogic;

namespace CameraApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CameraController : ControllerBase
    {
        private ICameraProvider provider;

        public CameraController(ICameraProvider provider)
        {
          this.provider = provider;
        }

        // GET api/camera
        [HttpGet]
        public ActionResult<IEnumerable<CameraModel>> Get()
        {
          return provider.GetCameras().ToList();
        }
    }
}
