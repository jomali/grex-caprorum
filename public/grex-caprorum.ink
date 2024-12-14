# title: Grex Caprorum
# author: Textualiza

VAR intellect = 0
VAR motorics = 0
VAR physique = 0
VAR psyche = 0

-> Combate

=== Combate ===

Hacer acrobacias en gravedad cero suele ser divertido. De verdad.

Apostarías un trago a que si te pasearas por el puerto de la estación un día cualquiera verías algún estibador lanzándose de un lado a otro haciendo tirabuzones y dando volteretas. Aquello parece un puto circo a veces.

Pero no es tan divertido cuando has perdido el control y giras desorientado sobre ti mismo.

Los focos del almacén parecen orbitar a tu alrededor a toda velocidad, como decenas de soles saliendo y poniéndose de nuevo en apenas unos fragmentos de segundo. Tu estómago se revuelve, listo para saltar fuera a través del primer orificio que te atrevas a abrir lo suficiente.

Hasta que te estrellas con fuerza contra uno de los laterales de la jaula y consigues aferrarte a algo y recuperar el control.

La multitud apelotonada en el almacén grita. Están eufóricos después de ese último golpe que te ha encajado Lecilia.

* [La busco con la mirada]

-
Aún desorientado, necesitas un momento para ubicarla de nuevo. Está sobre tu cabeza a algunos metros de distancia, agarrada a uno de los tirantes que cruzan el espacio del ring.

-> Combate.acciones

= acciones

+ [Me adelanto y ataco primero #physique(50) #Combate.ataque1_exito #Combate.ataque1_fracaso] -> DONE
+ [Estudio sus movimientos buscando un punto débil #intellect(50) #Combate.estudio1_exito #Combate.estudio2_fracaso] -> DONE
+ [Me rindo] -> Combate.rendirte

= ataque1_exito

Sin pensártelo, te das impulso con las correas y te lanzas a toda velocidad. Lecilia no se espera el movimiento y no tiene tiempo a reaccionar. Trata de protegerse en el último momento pero consigues golpear con fuerza en su estómago.

Esta vez es ella la que sale flotando disparada hasta golpear contra uno de los extremos del ring.

-> Combate.acciones

= ataque1_fracaso

Sin pensártelo, te das impulso con las correas y te lanzas a toda velocidad. Pero Lecilia ve tu movimiento y consigue echarse a un lado y esquivarte con facilidad.

-> Combate.acciones

= estudio1_exito

Lecilia se mueve entre la telaraña de correas, impulsándose con la misma facilidad con manos que con pies. La tía es sorprendentemente ágil.

Pero es una presumida. Cada vez que se acerca a una de las paredes de la jaula tiene la manía de dar una voltereta hacia atrás en posición de cruz extendida. Una filigrana que encanta al público.

-> Combate.acciones

= estudio2_fracaso

Lecilia se mueve entre la telaraña de correas, impulsándose con la misma facilidad con manos que con pies. La tía es sorprendentemente ágil.

Desde luego es mucho más ágil que tú. Incluso se permite hacer filigranas acrobáticas delante del público. No encuentras nada que te pueda una ventaja.

-> Combate.acciones

= rendirte

Levantas las manos y pones fin al combate.

Esa cabrona es demasiado fuerte.

La gente comienza a marcharse poco a poco, entre gestos de alegría o decepción en función de si habían apostado por tí o por Lecilia. No se te escapa que incluso entre aquellos que han ganado dinero hoy, son muchos los que abandonan el almacén cabizbajos por no haber podido ver como te partían aún más la cara.

Te encojes de hombros. Seguro que mañana tienen más suerte.

FIN

-> END
