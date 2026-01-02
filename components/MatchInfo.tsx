import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Clock, MapPin } from "lucide-react";

interface MatchInfoProps {
  ort: string;
  anstosszeit: string;
  treffzeit: string;
}

export function MatchInfo({ ort, anstosszeit, treffzeit }: MatchInfoProps) {
  return (
    <Card className="w-full max-w-md border-0 shadow-lg bg-gradient-to-r from-muted/50 to-background/90">
      <CardHeader className="pb-3">
        <div className="flex items-center gap-2 mb-2">
          <MapPin className="h-4 w-4 text-primary" />
          <CardTitle className="text-sm font-bold tracking-wide uppercase text-foreground/90">
            {ort}
          </CardTitle>
        </div>
      </CardHeader>
      
      <CardContent className="p-4 pt-0 space-y-3">
        {/* TREFFZEIT HERVORHEBEN (groß + prominent) */}
        <div className="flex items-center justify-between py-3 bg-gradient-to-r from-primary/5 to-primary/10 rounded-lg p-3 border border-primary/20 shadow-sm">
          <div className="flex items-center gap-2">
            <Clock className="h-5 w-5 text-primary" />
            <span className="text-base font-bold text-foreground tracking-wide">
              Treffpunkt
            </span>
          </div>
          <Badge 
            variant="default" 
            className="text-lg font-black px-6 py-3 shadow-lg bg-gradient-to-r from-primary to-primary/90 text-primary-foreground border-2 border-primary/50 hover:shadow-xl transition-all duration-200 scale-105"
          >
            {treffzeit}
          </Badge>
        </div>

        {/* Anstoß (normal) */}
        <div className="flex items-center justify-between py-2 border-b border-border/50">
          <span className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
            Anstoß
          </span>
          <Badge 
            variant="secondary" 
            className="text-xs font-bold px-3 py-1 bg-primary/10 text-primary border-primary/20"
          >
            {anstosszeit}
          </Badge>
        </div>
      </CardContent>
    </Card>
  );
}
