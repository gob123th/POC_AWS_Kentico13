using AngleSharp.Dom;
using CMS.Base;
using DancingGoat;
using Kentico.Components.Web.Mvc.FormComponents;
using Kentico.Content.Web.Mvc;
using Kentico.Forms.Web.Mvc;
using Kentico.PageBuilder.Web.Mvc;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.ViewComponents;
using Microsoft.Extensions.Localization;
using MvcApp.Widgets;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;
using System.Xml;

[assembly: RegisterWidget(RichTextsWidgetViewComponent.IDENTIFIER,
    viewComponentType: typeof(RichTextsWidgetViewComponent),
    name: "RichText/Static HTML widget",
    typeof(RichTextsWidgetProperties),
    Description = "Static HTML content", IconClass = "icon-l-header-text")]

namespace MvcApp.Widgets
{
    public class RichTextsWidgetViewComponent : ViewComponent
    {
        /// <summary>
        /// Widget identifier.
        /// </summary>
        public const string IDENTIFIER = "DMT.BAY.RichTextsWidget";

        public RichTextsWidgetViewComponent(IStringLocalizer<SharedResources> stringLocalizer)
        {
        }
        public async Task<ViewViewComponentResult> InvokeAsync(RichTextsWidgetProperties properties)
        {
            var model = new RichTextsWidgetViewModel
            {

            };
            var viewName = "~/Components/Widgets/RichText/_default.cshtml";

            try
            {
                model = new RichTextsWidgetViewModel
                {

                };
                model.RichTexts = properties.RichTexts;
                model.isEnableRichTextMode = properties.EnableRichTextMode;

                return View(viewName, model);
            }

            catch (Exception ex)
            {
                model.ExceptionMessage = ex.Message;
            }

            return View(viewName, model);
        }
    }

    public class RichTextsWidgetViewModel
    {
        public string RichTexts { get; set; }
        public string ExceptionMessage { get; set; } = string.Empty;
        public bool isEnableRichTextMode { get; set; } = false;
    }

    public class RichTextsWidgetProperties : IWidgetProperties
    {
        [EditingComponent(TextAreaComponent.IDENTIFIER, Label = "RichTexts zone", Order = 1001)]
        [Required]
        public string RichTexts { get; set; }
        [EditingComponent(CheckBoxComponent.IDENTIFIER, Label = "Enable RichText Editor", Order = 101)]
        public bool EnableRichTextMode { get; set; }
    }
}